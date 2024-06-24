import {afterEach, beforeAll, describe, expect, test, vi} from "vitest";
import {RepositoryConfig} from "../../../src/Config/RepositoryConfig";
import nock from "nock";
import {Context} from "probot";




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

        const config = await RepositoryConfig.readConfigFromRepository(mockGitHubContext);

        expect(getContentsSpy).toHaveBeenCalledOnce();
        expect(config).toBeTypeOf('object');
        expect(config).toStrictEqual({});
        expect(logErrorSpy).toHaveBeenCalledOnce();
        expect(logErrorSpy.mock.calls[0][0]).toBeInstanceOf(Error);//Replace with custom exception type

    });

});