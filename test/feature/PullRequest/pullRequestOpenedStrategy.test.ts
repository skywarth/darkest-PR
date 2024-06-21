import {describe, expect, test, beforeEach, afterEach, vi} from "vitest";
import {Probot, ProbotOctokit} from "probot";
import nock from "nock";
import DarkestPR from "../../../src/index";
import {QuoteFacade} from "../../../src/Quote/QuoteFacade";
import {CommentFactory} from "../../../src/Comment/CommentFactory";
import Comment from "../../../src/Comment/Comment";
import {CaseSlugs} from "../../../src/enums/CaseSlug";
import PullRequestOpenedStrategy from "../../../src/ActionHandler/PullRequest/PullRequestOpenedStrategy";




import pullRequestOpenedPayload from '../../fixtures/events/pull_request/pull_request.opened.json';
import pullRequestListNotMerged from '../../fixtures/data/pulls/pulls.list.not-merged.json';
import pullRequestListMerged from '../../fixtures/data/pulls/pulls.list.merged.json';



describe("Pull Request Opened Tests", () => {

    let probot:Probot;
    const quoteFacadeGetQuoteSpy=vi.spyOn(QuoteFacade.prototype, 'getQuote')
    const commentFactoryCreateSpy=vi.spyOn(CommentFactory.prototype, 'create')
    const prOpenedStrategyExecutePrStrategySpy=vi.spyOn(PullRequestOpenedStrategy.prototype as any, 'executePrStrategy')
    const mockCreateComment = vi.fn(function (param:any){
        return param;
    });

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
        //vi.restoreAllMocks();
        vi.clearAllMocks();
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
                .reply(200, []);//implying no previous pull requests

            const mockCreateComment = vi.fn(function (param:any){
                return param;
            });

            nock('https://api.github.com')
                .post('/repos/test-owner/test-repo/issues/1/comments',mockCreateComment)
                .reply(200);

            // Receive a webhook event
            await probot.receive({
                id: '123',
                name: 'pull_request',
                payload: pullRequestOpenedPayload as any,
            });

            expect(prOpenedStrategyExecutePrStrategySpy).toHaveBeenCalled();
            expect(quoteFacadeGetQuoteSpy).toHaveBeenCalled();
            expect(commentFactoryCreateSpy).toHaveBeenCalled();
            const commentInstance:Comment=commentFactoryCreateSpy.mock.results[0].value;
            expect(commentInstance).toBeInstanceOf(Comment);
            expect(commentInstance.caseSlug).toBe(CaseSlugs.PullRequest.Opened.Fresh);

            const sentData=mockCreateComment.mock.results[0]?.value??{};
            expect(mockCreateComment).toHaveBeenCalledOnce();
            expect(sentData).toHaveProperty('body');
            expect(sentData.body).toBeTypeOf('string');
            expect(sentData.body.length).toBeGreaterThan(0);
        });

    });

    describe("Has previous PRs", () => {
        test("Previously not merged (closed)", async () => {
            nock('https://api.github.com')
                .get('/repos/test-owner/test-repo/pulls')
                .query(true)
                .reply(200, pullRequestListNotMerged);



            nock('https://api.github.com')
                .post('/repos/test-owner/test-repo/issues/1/comments',mockCreateComment)
                .reply(200);

            await probot.receive({
                id: '123',
                name: 'pull_request',
                payload: pullRequestOpenedPayload as any,
            });


            expect(prOpenedStrategyExecutePrStrategySpy).toHaveBeenCalled();
            expect(quoteFacadeGetQuoteSpy).toHaveBeenCalled();
            expect(commentFactoryCreateSpy).toHaveBeenCalled();
            const commentInstance:Comment=commentFactoryCreateSpy.mock.results[0].value;
            expect(commentInstance).toBeInstanceOf(Comment);
            expect(commentInstance.caseSlug).toBe(CaseSlugs.PullRequest.Opened.PreviouslyClosed);

            const sentData=mockCreateComment.mock.results[0]?.value??{};
            expect(mockCreateComment).toHaveBeenCalledOnce();
            expect(sentData).toHaveProperty('body');
            expect(sentData.body).toBeTypeOf('string');
            expect(sentData.body.length).toBeGreaterThan(0);

        })

        test("Previously merged", async () => {
            nock('https://api.github.com')
                .get('/repos/test-owner/test-repo/pulls')
                .query(true)
                .reply(200, pullRequestListMerged);



            nock('https://api.github.com')
                .post('/repos/test-owner/test-repo/issues/1/comments',mockCreateComment)
                .reply(200);

            await probot.receive({
                id: '123',
                name: 'pull_request',
                payload: pullRequestOpenedPayload as any,
            });






            expect(prOpenedStrategyExecutePrStrategySpy).toHaveBeenCalled();
            expect(quoteFacadeGetQuoteSpy).toHaveBeenCalled();
            expect(commentFactoryCreateSpy).toHaveBeenCalled();
            const commentInstance:Comment=commentFactoryCreateSpy.mock.results[0].value;
            expect(commentInstance).toBeInstanceOf(Comment);
            expect(commentInstance.caseSlug).toBe(CaseSlugs.PullRequest.Opened.PreviouslyMerged);

            const sentData=mockCreateComment.mock.results[0]?.value??{};
            expect(mockCreateComment).toHaveBeenCalledOnce();
            expect(sentData).toHaveProperty('body');
            expect(sentData.body).toBeTypeOf('string');
            expect(sentData.body.length).toBeGreaterThan(0);

        })
    })






});