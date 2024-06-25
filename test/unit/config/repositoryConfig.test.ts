import {afterEach, beforeAll, describe, expect, Mock, MockInstance, test, vi} from "vitest";
import {RepositoryConfig} from "../../../src/Config/RepositoryConfig";
import nock from "nock";
import {Context} from "probot";
import {RequestError} from "@octokit/request-error";
import {EventSubscriptionsDTO} from "../../../src/DTO/EventSubscriptionsDTO";




describe('RepositoryConfig', () => {


    // Mock Context
    let mockGitHubContext:Context;
    let mockHttpError:Mock;
    let mockConfigEndpointResponse:Mock;
    let getContentsSpy:MockInstance;
    let logErrorSpy:MockInstance;

    const initializeMocks = () => {
        mockGitHubContext={
            octokit: {
                repos: {
                    getContent:vi.fn()
                }
            },
            repo: () => ({ owner: 'test-owner', repo: 'test-repo' }),
            log: {
                error: vi.fn()
            }
        } as unknown as Context;

        getContentsSpy=vi.spyOn(mockGitHubContext.octokit.repos,'getContent');
        logErrorSpy=vi.spyOn(mockGitHubContext.log,'error');
        mockHttpError=vi.fn().mockImplementation((msg:string,statusCode:number):Error=>{
            return new RequestError(msg,statusCode,{
                request: {
                    method: "POST",
                    url: "https://api.github.com/foo",
                    body: {
                        bar: "baz",
                    },
                    headers: {
                        authorization: "token secret123",
                    },
                },
                response: {
                    status: 500,
                    url: "https://api.github.com/foo",
                    headers: {
                        "x-github-request-id": "1:2:3:4",
                    },
                    data: {
                        foo: "bar",
                    },
                },
            });
        });

        mockConfigEndpointResponse=vi.fn().mockImplementation((mockConfigString:string)=>{
            return {
                data: {
                    content: Buffer.from(mockConfigString).toString('base64')
                }
            } as any
        })
    };



    beforeAll(() => {
        nock.disableNetConnect();
        initializeMocks();
    });

    afterEach(() => {
        nock.cleanAll();
        vi.clearAllMocks();
    });

    describe('readConfigFromRepository()', () => {
        test("Reading repository configuration file", async () => {
            const mockConfig:Partial<RepositoryConfig> = {
                debug_mode: true,
                emojis: false,
                event_subscriptions: {
                    'pull_request.opened': true,
                    'issue_comment.created':false,
                }
            };

            getContentsSpy.mockImplementationOnce(async ()=>mockConfigEndpointResponse(JSON.stringify(mockConfig)));

            const config = await RepositoryConfig.readConfigFromRepository(mockGitHubContext);

            expect(getContentsSpy).toHaveBeenCalledOnce();
            expect(config).toBeTypeOf('object');
            expect(config).toStrictEqual(mockConfig);
            expect(config.event_subscriptions).toStrictEqual(mockConfig.event_subscriptions);
            expect(logErrorSpy).not.toBeCalled();
        });

        test("Missing repository configuration file", async () => {

            getContentsSpy.mockRejectedValueOnce(mockHttpError('Not found',404));

            const config = await RepositoryConfig.readConfigFromRepository(mockGitHubContext);

            expect(getContentsSpy).toHaveBeenCalledOnce();
            expect(config).toBeTypeOf('object');
            expect(config).toStrictEqual({});
            expect(logErrorSpy).toHaveBeenCalledOnce();
            expect(logErrorSpy.mock.calls[0][0]).toBeInstanceOf(RequestError);
            expect(logErrorSpy.mock.calls[0][0].status).toBe(404);

        });


        test("Incorrect config format", async () => {

            getContentsSpy.mockImplementationOnce(async ()=>mockConfigEndpointResponse(
                `{debug_mode:true}`//missing double-quotes from the key
            ));

            const config = await RepositoryConfig.readConfigFromRepository(mockGitHubContext);

            expect(getContentsSpy).toHaveBeenCalledOnce();
            expect(config).toBeTypeOf('object');
            expect(config).toStrictEqual({});
            expect(logErrorSpy).toHaveBeenCalledOnce();
            expect(logErrorSpy.mock.calls[0][0]).toBeInstanceOf(SyntaxError);

        });
    })

    describe('isEventSubscriptionEnabled()', () => {
        test("No declaration for event subscriptions, using defaults", async () => {
            const mockConfig:Partial<RepositoryConfig> = {
                debug_mode: true,
                emojis: false,
            };

            const repositoryConfig=new RepositoryConfig(mockConfig);

            expect(repositoryConfig.isEventSubscriptionEnabled('issue_comment.created')).toBe(repositoryConfig.defaultEventSubscription);
            expect(logErrorSpy).not.toBeCalled();
        });

        test("Declaration for event subscriptions, but empty", async () => {
            const mockConfig:Partial<RepositoryConfig> = {
                debug_mode: false,
                emojis: true,
                event_subscriptions:{}
            };

            const repositoryConfig=new RepositoryConfig(mockConfig);

            expect(repositoryConfig.isEventSubscriptionEnabled('issue_comment.created')).toBe(repositoryConfig.defaultEventSubscription);
            expect(logErrorSpy).not.toBeCalled();
        });

        test("Declaration for event subscriptions, contains valid keys and values", async () => {
            const eventSubscriptions:EventSubscriptionsDTO={
                'pull_request.opened':true,
                'issue_comment.created':false,
                'pull_request_review.submitted':false,
            };
            const mockConfig:Partial<RepositoryConfig> = {
                debug_mode: false,
                emojis: true,
                event_subscriptions:eventSubscriptions
            };

            const repositoryConfig=new RepositoryConfig(mockConfig);

            expect(repositoryConfig.isEventSubscriptionEnabled('issue_comment.created')).toBe(eventSubscriptions['issue_comment.created']);
            expect(repositoryConfig.isEventSubscriptionEnabled('pull_request.opened')).toBe(eventSubscriptions['pull_request.opened']);
            expect(repositoryConfig.isEventSubscriptionEnabled('pull_request_review.submitted')).toBe(eventSubscriptions['pull_request_review.submitted']);
            expect(logErrorSpy).not.toBeCalled();
        });

    });

    describe('Initialization/Constructor', () => {
        test("Standard procedure, valid config with event subscriptions", async () => {
            const eventSubscriptions:EventSubscriptionsDTO={
                'pull_request.opened':true,
                'issue_comment.created':false,
                'pull_request_review.submitted':false,
            };
            const mockConfig:Partial<RepositoryConfig> = {
                debug_mode: false,
                emojis: true,
                event_subscriptions:eventSubscriptions
            };


            getContentsSpy.mockImplementationOnce(async ()=>mockConfigEndpointResponse(JSON.stringify(mockConfig)));

            const config = await RepositoryConfig.readConfigFromRepository(mockGitHubContext);
            const repositoryConfig=new RepositoryConfig(config);

            expect(getContentsSpy).toHaveBeenCalledOnce();
            expect(repositoryConfig.debug_mode).toStrictEqual(mockConfig.debug_mode);
            expect(repositoryConfig.emojis).toStrictEqual(mockConfig.emojis);
            expect(repositoryConfig.event_subscriptions).toStrictEqual(mockConfig.event_subscriptions);
            expect(logErrorSpy).not.toBeCalled();


        });
    });


});