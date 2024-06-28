import {describe, test, afterEach, vi, beforeAll, expect} from "vitest";
import {StrategyTestSetup} from "../strategyTestSetup";
import IssueCommentCreatedStrategy from "../../../src/ActionHandler/IssueComment/IssueCommentCreatedStrategy";


import issueCommentCreatedBasePayload from '../../fixtures/events/issue/issue.comment.created.json';
import {RepositoryConfig} from "../../../src/Config/RepositoryConfig";
import {CaseSlugs} from "../../../src/enums/CaseSlug";



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

    });


});