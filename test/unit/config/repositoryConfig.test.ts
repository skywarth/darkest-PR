import {afterEach, beforeAll, describe, expect, test, vi} from "vitest";
import {RepositoryConfig} from "../../../src/Config/RepositoryConfig";
import nock from "nock";
import {Context} from "probot";
import { RequestError } from "@octokit/request-error";




describe('RepositoryConfig', () => {


    // Mock Context
    const mockGitHubContext={//TODO: move to initialization, along with spies
        octokit: {
            repos: {
                getContent:vi.fn()
            }
        },
        repo: () => ({ owner: 'test-owner', repo: 'test-repo' }),
        log: {
            error: vi.fn()
        }
    } as unknown as Context

    const mockHttpError=(msg:string,statusCode:number)=>{
        throw new RequestError(msg,statusCode,{
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
    }

    const getContentsSpy=vi.spyOn(mockGitHubContext.octokit.repos,'getContent');
    const logErrorSpy=vi.spyOn(mockGitHubContext.log,'error');

    beforeAll(() => {
        nock.disableNetConnect();
    });

    afterEach(() => {
        nock.cleanAll();
        vi.clearAllMocks();
    });

    test("Reading repository configuration file", async () => {
        const mockConfig = {
            debug_mode: true,
            emojis: false,
            event_subscriptions: {
                'pull_request.opened': true
            }
        };

        getContentsSpy.mockImplementationOnce(async ()=>{
            return {
                data: {
                    content: Buffer.from(JSON.stringify(mockConfig)).toString('base64')
                }
            } as any
        });

        const config = await RepositoryConfig.readConfigFromRepository(mockGitHubContext);

        expect(getContentsSpy).toHaveBeenCalledOnce();
        expect(config).toBeTypeOf('object');
        expect(config).toStrictEqual(mockConfig);
        expect(logErrorSpy).not.toBeCalled();
    });

    test("Missing repository configuration file", async () => {

        getContentsSpy.mockImplementationOnce(async()=>mockHttpError('Not found',404));

        const config = await RepositoryConfig.readConfigFromRepository(mockGitHubContext);

        expect(getContentsSpy).toHaveBeenCalledOnce();
        expect(config).toBeTypeOf('object');
        expect(config).toStrictEqual({});
        expect(logErrorSpy).toHaveBeenCalledOnce();
        expect(logErrorSpy.mock.calls[0][0]).toBeInstanceOf(Error);
        expect((logErrorSpy.mock.calls[0][0] as any).status).toBe(404);

    });

});