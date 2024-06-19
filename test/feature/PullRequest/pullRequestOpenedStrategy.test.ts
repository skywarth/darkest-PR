import {describe, expect, test, beforeEach, afterEach, vi} from "vitest";
import {Probot, ProbotOctokit} from "probot";
import nock from "nock";
import DarkestPR from "../../../src/index";
import pullRequestOpenedPayload from '../../fixtures/events/pull_request/pull_request.opened.json';


describe("Pull Request Opened Tests", () => {

    let probot:Probot;

    beforeEach(() => {
        nock.disableNetConnect();
        probot = new Probot({
            githubToken: "test",
            // Disable throttling & retrying requests for easier testing
            Octokit: ProbotOctokit.defaults({
                retry: { enabled: false },
                throttle: { enabled: false },
            }),
        });
        DarkestPR(probot);
    });


    afterEach(() => {
        nock.cleanAll();
        //nock.enableNetConnect();
    });


    describe("No previous PRs", () => {
        test("Creates a comment after receiving the event", async () => {

            /*nock("https://api.github.com")
                .post("/app/installations/2/access_tokens")
                .reply(200, { token: "test" });*/


            nock('https://api.github.com')
                .get('/repos/test-owner/test-repo/pulls')
                .query(true)
                .reply(200, []);

            const mockCreateComment = vi.fn(function (param:any){
                return param;
            });

            nock('https://api.github.com')
                .post('/repos/test-owner/test-repo/issues/1/comments',(body) => {
                    mockCreateComment(body);
                    return true;
                })
                .reply(200);

            // Receive a webhook event
            await probot.receive({
                id: '123',
                name: 'pull_request',
                payload: pullRequestOpenedPayload as any,
            });

            const sentData=mockCreateComment.mock.results[0].value;
            expect(mockCreateComment).toHaveBeenCalledOnce();
            expect(sentData).toHaveProperty('body');
            expect(sentData.body).toBeTypeOf('string');
        });

    });

    describe("Has previous PRs", () => {
        test("Not merged", async () => {
            expect(true).toBe(true);
            nock('https://api.github.com')
                .get('/repos/test-owner/test-repo/pulls')
                .query(true)
                .reply(200, []);
        })
    })






});