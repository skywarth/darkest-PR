// StrategyTestSetup.ts
import {Probot, ProbotOctokit} from 'probot';
import nock from 'nock';
import {vi, MockInstance, Mock, expect} from 'vitest';
import DarkestPR from "../../src";
import {QuoteFacade} from "../../src/Quote/QuoteFacade";
import {CommentFactory} from "../../src/Comment/CommentFactory";
import Comment from "../../src/Comment/Comment";

export class StrategyTestSetup {
    probot!: Probot;
    quoteFacadeGetQuoteSpy!: MockInstance;
    commentFactoryCreateSpy!: MockInstance;
    actionStrategyHandleSpy!: MockInstance;
    createCommentEndpointMock: Mock=vi.fn();
    pullRequestIndexResponseMock: Mock=vi.fn();
    pullRequestReviewIndexResponseMock: Mock=vi.fn();

    constructor() {
        //this.initializeMocks();
    }

    initializeMocks() {
        this.probot = new Probot({
            githubToken: "test",
            Octokit: ProbotOctokit.defaults(function(instanceOptions: any) {
                return {
                    ...instanceOptions,
                    retry: { enabled: false },
                    throttle: { enabled: false },
                };
            }),
        });
        DarkestPR(this.probot);

        this.quoteFacadeGetQuoteSpy = vi.spyOn(QuoteFacade.prototype, 'getQuote');
        this.commentFactoryCreateSpy = vi.spyOn(CommentFactory.prototype, 'create');
        this.createCommentEndpointMock.mockImplementation((param: any) => param);
        this.pullRequestIndexResponseMock.mockImplementation(()=>[]);//default implementation
    }

    setupEndpointMocks() {
        const endpointRoot: string = 'https://api.github.com';
        const owner:string='test-owner';
        const repo:string='test-repo';


        const pullNumber:number=555444;

        nock(endpointRoot)
            .persist()
            .get(`/repos/${owner}/${repo}/pulls`)
            .query(true)
            .reply(200, this.pullRequestIndexResponseMock);

        nock(endpointRoot)
            .persist()
            .post(`/repos/${owner}/${repo}/issues/${pullNumber}/comments`, this.createCommentEndpointMock)
            .reply(200);

        nock(endpointRoot)
            .persist()
            .get(`/repos/${owner}/${repo}/contents/.darkest-pr.json`)
            .reply(200, {
                content: Buffer.from(JSON.stringify({/* config object */})).toString('base64')
            });

        nock(endpointRoot)
            .persist()
            .get(`/repos/${owner}/${repo}/pulls/${pullNumber}/reviews`)
            .reply(200, this.pullRequestReviewIndexResponseMock);
    }

    beforeAll() {
        nock.disableNetConnect();
        this.initializeMocks();
        this.setupEndpointMocks();
    }

    afterEach() {
        vi.clearAllMocks();
    }


    performCommonAssertions(expectedCaseSlug:string):{comment:Comment}{
        expect(this.actionStrategyHandleSpy).toHaveBeenCalled();
        expect(this.quoteFacadeGetQuoteSpy).toHaveBeenCalled();
        expect(this.commentFactoryCreateSpy).toHaveBeenCalled();
        const commentInstance = this.commentFactoryCreateSpy.mock.results[0].value;
        expect(commentInstance).toBeInstanceOf(Comment);
        expect(commentInstance.caseSlug).toBe(expectedCaseSlug);

        const sentData = this.createCommentEndpointMock.mock.results[0]?.value ?? {};
        expect(this.createCommentEndpointMock).toHaveBeenCalledOnce();
        expect(sentData).toHaveProperty('body');
        expect(sentData.body).toBeTypeOf('string');
        expect(sentData.body.length).toBeGreaterThan(0);
        return {
            comment:commentInstance
        };
    }
}
