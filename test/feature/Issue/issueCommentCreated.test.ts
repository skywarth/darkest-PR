import {describe, test, afterEach, vi, beforeAll, expect} from "vitest";
import {StrategyTestSetup} from "../strategyTestSetup";
import IssueCommentCreatedStrategy from "../../../src/ActionHandler/IssueComment/IssueCommentCreatedStrategy";


import issueCommentCreatedBasePayload from '../../fixtures/events/issue/issue.comment.created.json';
import {RepositoryConfig} from "../../../src/Config/RepositoryConfig";
import {CaseSlugs} from "../../../src/enums/CaseSlug";
import {EventSubscriptionsDTO} from "../../../src/DTO/EventSubscriptionsDTO";
import {BotConfig} from "../../../src/Config/BotConfig";
import Utils from "../../../src/Utils";



describe("Issue Comment Created", () => {
    const strategyTestSetup = new StrategyTestSetup();

    function getEventPayload(commentBody:string){
        return {
            ...issueCommentCreatedBasePayload,
            comment: {
                ...issueCommentCreatedBasePayload.comment,
                body: commentBody
            }
        }

    }

    beforeAll(() => {
        strategyTestSetup.beforeAll();
        strategyTestSetup.actionStrategyHandleSpy = vi.spyOn(IssueCommentCreatedStrategy.prototype as any, 'handle');
    });

    afterEach(() => {
        strategyTestSetup.afterEach();
    });


    test("Bot doesn't act when not mentioned in the comment", async () => {


        await strategyTestSetup.probot.receive({
            id: '123',
            name: 'issue_comment',
            payload: getEventPayload("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet scelerisque ex. ```const test='aa'```") as any,
        });

        expect(strategyTestSetup.actionStrategyHandleSpy).toHaveBeenCalledOnce();
        expect(strategyTestSetup.createCommentEndpointMock).not.toHaveBeenCalled();

    });

    describe("Created comment mentions the bot", () => {

        describe("Repository configurations are considered",()=>{
            test("Doesn't respond if the event subscription is not enabled", async () => {

                const mockConfig:Partial<RepositoryConfig> = {
                    debug_mode: true,
                    emojis: false,
                    event_subscriptions: {
                        'issue_comment.created':false,
                    }
                };

                strategyTestSetup.getConfigResponseMock.mockImplementationOnce(()=>mockConfig);

                await strategyTestSetup.probot.receive({
                    id: '123',
                    name: 'issue_comment',
                    payload: getEventPayload("Hello there @Darkest-pr") as any,
                });

                expect(strategyTestSetup.actionStrategyHandleSpy).toHaveBeenCalledOnce();
                expect(strategyTestSetup.quoteFacadeGetQuoteSpy).not.toHaveBeenCalled();
                expect(strategyTestSetup.createCommentEndpointMock).not.toHaveBeenCalled();


            });

            test("Responds if event subscription is enabled", async () => {

                const mockConfig:Partial<RepositoryConfig> = {
                    debug_mode: false,
                    emojis: false,
                    event_subscriptions: {
                        'issue_comment.created':true,
                        'pull_request.closed':false,
                    }
                };

                strategyTestSetup.getConfigResponseMock.mockImplementationOnce(()=>mockConfig);

                await strategyTestSetup.probot.receive({
                    id: '123',
                    name: 'issue_comment',
                    payload: getEventPayload("@Darkest-pr give me a quote please. `cool`.") as any,
                });

                strategyTestSetup.performCommonAssertions(CaseSlugs.Issue.Comment.Created.BotTagged.ParametersNotProvided);
            });

            test("Includes debug output when it is enabled", async () => {

                const mockConfig:Partial<RepositoryConfig> = {
                    debug_mode: true,
                    emojis: false,
                };

                strategyTestSetup.getConfigResponseMock.mockImplementationOnce(()=>mockConfig);

                await strategyTestSetup.probot.receive({
                    id: '123',
                    name: 'issue_comment',
                    payload: getEventPayload("I need @darkest-pr to give me a quote mister!") as any,
                });

                const data=strategyTestSetup.performCommonAssertions(CaseSlugs.Issue.Comment.Created.BotTagged.ParametersNotProvided);
                expect(data.comment.body).toContain('Debug');

            });

            test("Excludes emojis from the comment if not enabled", async () => {

                const emojiRegex = /:[a-zA-Z0-9_+-]+:/;

                const mockConfig:Partial<RepositoryConfig> = {
                    emojis: false,
                };

                strategyTestSetup.getConfigResponseMock.mockImplementationOnce(()=>mockConfig);

                await strategyTestSetup.probot.receive({
                    id: '123',
                    name: 'issue_comment',
                    payload: getEventPayload("Dude I hate emojis, how about you? @Darkest-PR") as any,
                });

                const data=strategyTestSetup.performCommonAssertions(CaseSlugs.Issue.Comment.Created.BotTagged.ParametersNotProvided);
                expect(data.comment.body).not.toMatch(emojiRegex);

            });
        })

        describe("Bot configurations are considered",()=>{
            test("Doesn't respond if the event subscription is not enabled", async () => {

                const eventSubscriptions:EventSubscriptionsDTO = {
                    'issue_comment.created':false,
                };

                vi.stubEnv('DARKEST_PR_EVENT_SUBSCRIPTIONS', JSON.stringify(eventSubscriptions));
                BotConfig.refreshInstance();



                await strategyTestSetup.probot.receive({
                    id: '123',
                    name: 'issue_comment',
                    payload: getEventPayload("Hello there @Darkest-pr") as any,
                });

                expect(strategyTestSetup.actionStrategyHandleSpy).toHaveBeenCalledOnce();
                expect(strategyTestSetup.quoteFacadeGetQuoteSpy).not.toHaveBeenCalled();
                expect(strategyTestSetup.createCommentEndpointMock).not.toHaveBeenCalled();


                vi.unstubAllEnvs();
                BotConfig.refreshInstance();

            });

            test("Doesn't respond if the bot is disabled", async () => {


                vi.stubEnv('DARKEST_PR_ACTIVE', 'false');
                BotConfig.refreshInstance();


                await strategyTestSetup.probot.receive({
                    id: '123',
                    name: 'issue_comment',
                    payload: getEventPayload("Hello there @Darkest-pr") as any,
                });

                expect(strategyTestSetup.actionStrategyHandleSpy).toHaveBeenCalledOnce();
                expect(strategyTestSetup.quoteFacadeGetQuoteSpy).not.toHaveBeenCalled();
                expect(strategyTestSetup.createCommentEndpointMock).not.toHaveBeenCalled();

                vi.unstubAllEnvs();
                BotConfig.refreshInstance();

            });


        })

        describe('ActionContext parameter provided', () => {
            test('Resorts to default when given parameter JSON is invalid',async ()=>{

                const actionContextDTOString='```json {"identifier":"Darkest-PR-input-package",sentiment:"Negative"} ```'//missing quotes for the sentiment key

                await strategyTestSetup.probot.receive({
                    id: '123',
                    name: 'issue_comment',
                    payload: getEventPayload(`@Darkest-pr Give me quote based on the parameter eh? ${actionContextDTOString}`) as any,
                });

                const data=strategyTestSetup.performCommonAssertions(CaseSlugs.Issue.Comment.Created.BotTagged.ParametersNotProvided);
                expect(data.comment.warnings.some(x=>x.includes('Malformed'))).toBe(true);

                strategyTestSetup.performCommonAssertions(CaseSlugs.Issue.Comment.Created.BotTagged.ParametersNotProvided);
            })

            test('Unrelated code sections are ignored',async ()=>{

                const unrelatedCodeSection='```json {"foo":"bar"} ```'

                await strategyTestSetup.probot.receive({
                    id: '123',
                    name: 'issue_comment',
                    payload: getEventPayload(`@Darkest-pr Give me quote based on the parameter eh? ${unrelatedCodeSection}`) as any,
                });

                const data=strategyTestSetup.performCommonAssertions(CaseSlugs.Issue.Comment.Created.BotTagged.ParametersNotProvided);
                expect(data.comment.warnings.some(x=>x.includes('Malformed'))).toBe(false);

            })

            test('Valid ActionContext parameter is utilized',async ()=>{

                const unrelatedCodeSection='```json {"foo":"bar"} ```';
                const actionContextParameterPackage={//not DTO because of identifier
                    identifier:'Darkest-PR-input-package',
                    sentiment:'Negative',
                    tags:['foo','bar','test','baz'],
                    emotionMatrix:[
                        {
                            "emotion": "Frustration",
                            "temperature": 4
                        },
                        {
                            "emotion": "Fury",
                            "temperature": 5
                        }
                    ],
                    quoteSlugs:['alpha','beta','gamma']
                }

                const commentBody =Utils.removeLeadingWhitespaces(//Causes problems when parsing if there is indent/whitespace in code sections
                    `Hey ancestor @Darkest-PR, give me a cool line!
                    Unrelated code 1:
                    ${unrelatedCodeSection}
                    
                    \`\`\`
                    console.log('test');
                    \`\`\`
                    
                    comcomcom
                    kk
                    
                    \`\`\`json
                    ${JSON.stringify(actionContextParameterPackage)}
                    \`\`\`
                    
                    So some unrelated code as well:
                    \`\`\`
                    console.log('test');
                    \`\`\`
                    
                    And more comment.`
                );

                await strategyTestSetup.probot.receive({
                    id: '123',
                    name: 'issue_comment',
                    //payload: getEventPayload("Hey ancestor @Darkest-PR, give me a cool line!\r\n\r\nUnrelated code 1:\r\n\r\n```\r\nconsole.log('test');\r\n```\r\n\r\ncomcomcom\r\nkk\r\n\r\n```json\r\n{\r\n  \"identifier\":\"Darkest-PR-input-package\",\r\n  \"sentiment\": \"Negative\",\r\n  \"emotionMetrics\": [\r\n    {\r\n      \"emotion\": \"Frustration\",\r\n      \"temperature\": 4\r\n    },\r\n    {\r\n      \"emotion\": \"Fury\",\r\n      \"temperature\": 5\r\n    },\r\n    {\r\n      \"emotion\": \"Wrath\",\r\n      \"temperature\": 3\r\n    }\r\n  ],\r\n  \"tags\": [\r\n    \"destroyed\",\r\n    \"obliterated\",\r\n    \"victory\"\r\n  ]\r\n}\r\n\r\n```\r\n\r\nSo some unrelated code as well\r\n```\r\nconsole.log('test');\r\n```\r\n\r\nAnd more comment."
                    payload: getEventPayload(commentBody) as any,
                });

                const data=strategyTestSetup.performCommonAssertions(CaseSlugs.Issue.Comment.Created.BotTagged.ParametersProvided);
                expect(data.comment.actionContext.sentiment).toBe(actionContextParameterPackage.sentiment);
                expect(data.comment.actionContext.tags).toStrictEqual(actionContextParameterPackage.tags);
                expect(data.comment.actionContext.quoteSlugs).toStrictEqual(actionContextParameterPackage.quoteSlugs);
                expect(data.comment.actionContext.emotionMatrix).toStrictEqual(actionContextParameterPackage.emotionMatrix);
                expect(data.comment.warnings.some(x=>x.includes('Malformed'))).toBe(false);
            })

        });

    });


});