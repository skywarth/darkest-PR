import {describe, test, afterEach, vi, beforeAll} from "vitest";
import {CaseSlugs} from "../../../src/enums/CaseSlug";
import {StrategyTestSetup} from "../strategyTestSetup";
import PullRequestClosedStrategy from "../../../src/ActionHandler/PullRequest/PullRequestClosedStrategy";



import pullRequestClosedMergedPayload from '../../fixtures/events/pull_request/closed/merged/pull_request.closed.merged.json';
import pullRequestClosedMergedNoCommentsPayload from '../../fixtures/events/pull_request/closed/merged/pull_request.closed.merged.no_comments.json';
import pullRequestClosedNotMergedPayload from '../../fixtures/events/pull_request/closed/not_merged/pull_request.closed.not_merged.json';
import pullRequestClosedNotMergedNoCommentsPayload from '../../fixtures/events/pull_request/closed/not_merged/pull_request.closed.not_merged.no_comments.json';

import pullRequestReviewsListMany from '../../fixtures/data/pull_request_reviews/pull_request_reviews.list.many.json';
import pullRequestReviewsListFew from '../../fixtures/data/pull_request_reviews/pull_request_reviews.list.few.json';

import pullRequestListNotMerged from '../../fixtures/data/pulls/pulls.list.not-merged.json';



describe("Pull Request Opened Tests", () => {
    const strategyTestSetup = new StrategyTestSetup();

    beforeAll(() => {
        strategyTestSetup.beforeAll();
    });

    afterEach(() => {
        strategyTestSetup.afterEach();
    });

    describe.each([
        {
            description: "Merged, many reviews",
            previousPrs: [],
            pullRequestReviews: pullRequestReviewsListMany,
            expectedCaseSlug: CaseSlugs.PullRequest.Closed.MergedManyReviews,
            payload:pullRequestClosedMergedPayload
        },
        {
            description: "Merged, few reviews",
            previousPrs: [],
            pullRequestReviews: pullRequestReviewsListFew,
            expectedCaseSlug: CaseSlugs.PullRequest.Closed.MergedFewReviews,
            payload:pullRequestClosedMergedPayload
        },
        {
            description: "Merged, no reviews",
            previousPrs: [],
            pullRequestReviews: [],
            expectedCaseSlug: CaseSlugs.PullRequest.Closed.MergedNoReviews,
            payload:pullRequestClosedMergedNoCommentsPayload
        },
        {
            description: "Not merged, many reviews",
            previousPrs: [],
            pullRequestReviews: pullRequestReviewsListMany,
            expectedCaseSlug: CaseSlugs.PullRequest.Closed.NotMergedManyReviews,
            payload:pullRequestClosedNotMergedPayload
        },
        {
            description: "Not merged, few reviews",
            previousPrs: [],
            pullRequestReviews: pullRequestReviewsListFew,
            expectedCaseSlug: CaseSlugs.PullRequest.Closed.NotMergedFewReviews,
            payload:pullRequestClosedNotMergedPayload
        },
        {
            description: "Not merged, no reviews",
            previousPrs: [],
            pullRequestReviews: [],
            expectedCaseSlug: CaseSlugs.PullRequest.Closed.NotMergedNoReviews,
            payload:pullRequestClosedNotMergedNoCommentsPayload
        },
        {
            description: "Not merged, previously closed",
            previousPrs: pullRequestListNotMerged,
            pullRequestReviews: pullRequestReviewsListFew,
            expectedCaseSlug: CaseSlugs.PullRequest.Closed.NotMergedPreviouslyClosed,
            payload:pullRequestClosedNotMergedPayload
        },
    ])('$description', ({ previousPrs,pullRequestReviews, expectedCaseSlug ,payload}) => {
        test('Creates a comment after receiving the event', async () => {
            strategyTestSetup.actionStrategyHandleSpy = vi.spyOn(PullRequestClosedStrategy.prototype as any, 'handle');

            strategyTestSetup.pullRequestIndexResponseMock.mockImplementation(() => previousPrs);
            strategyTestSetup.pullRequestReviewIndexResponseMock.mockImplementation(() => pullRequestReviews);

            await strategyTestSetup.probot.receive({
                id: '123',
                name: 'pull_request',
                payload: payload as any,
            });


            strategyTestSetup.performCommonAssertions(expectedCaseSlug);


        });
    });
});