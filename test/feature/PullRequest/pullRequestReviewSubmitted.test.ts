import {describe, test, afterEach, vi, beforeAll, expect} from "vitest";
import {CaseSlugs} from "../../../src/enums/CaseSlug";
import {StrategyTestSetup} from "../strategyTestSetup";
import PullRequestReviewSubmittedStrategy from "../../../src/ActionHandler/PullRequestReview/PullRequestReviewSubmittedStrategy";

import prReviewSubmittedBasePayload from '../../fixtures/events/pull_request/pull_request.review.submitted.json';
import {Sentiment} from "../../../src/enums/Sentiment";



describe("Pull Request review submitted", () => {
    const strategyTestSetup = new StrategyTestSetup();

    function getEventPayload(reviewState:string){
        return {
            ...prReviewSubmittedBasePayload,
                review: {
                    ...prReviewSubmittedBasePayload.review,
                    state: reviewState
                }
        }

    }

    beforeAll(() => {
        strategyTestSetup.beforeAll();
    });

    afterEach(() => {
        strategyTestSetup.afterEach();
    });

    describe.each([
        {
            description: "Review: Approved",
            expectedCaseSlug: CaseSlugs.PullRequest.Review.Submitted.Approved,
            payload:getEventPayload('approved'),
            sentiment:Sentiment.Positive
        },
        {
            description: "Review: Changes Requested (rejected)",
            expectedCaseSlug: CaseSlugs.PullRequest.Review.Submitted.ChangesRequested,
            payload:getEventPayload('changes_requested'),
            sentiment:Sentiment.Negative
        },
        {
            description: "Review: Comment",
            expectedCaseSlug: CaseSlugs.PullRequest.Review.Submitted.Commented,
            payload:getEventPayload('commented'),
            sentiment:Sentiment.Neutral
        },
    ])('$description', ({ expectedCaseSlug,payload,sentiment }) => {
        test('Creates a comment after receiving the event', async () => {

            strategyTestSetup.actionStrategyHandleSpy = vi.spyOn(PullRequestReviewSubmittedStrategy.prototype as any, 'handle');


            await strategyTestSetup.probot.receive({
                id: '123',
                name: 'pull_request_review',
                payload: payload as any,
            });


            const assertionData=strategyTestSetup.performCommonAssertions(expectedCaseSlug);
            expect(assertionData.comment.actionContext.sentiment).toBe(sentiment);


        });
    });
});