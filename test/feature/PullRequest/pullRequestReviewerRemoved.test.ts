import {describe, test, afterEach, vi, beforeAll} from "vitest";
import {CaseSlugs} from "../../../src/enums/CaseSlug";
import {StrategyTestSetup} from "../strategyTestSetup";
import PullRequestReviewerRemoved from "../../../src/ActionHandler/PullRequest/PullRequestReviewerRemoved";

import pullRequestReviewerRemovedPayload from '../../fixtures/events/pull_request/reviewer/pull_request.reviewer.removed.json';



describe("Pull Request reviewer removed tests", () => {
    const strategyTestSetup = new StrategyTestSetup();

    beforeAll(() => {
        strategyTestSetup.beforeAll();
    });

    afterEach(() => {
        strategyTestSetup.afterEach();
    });

    describe.each([
        {
            description: "Reviewer removed",
            expectedCaseSlug: CaseSlugs.PullRequest.Reviewer.Removed,
        }
    ])('$description', ({ expectedCaseSlug }) => {
        test('Creates a comment after receiving the event', async () => {

            strategyTestSetup.actionStrategyHandleSpy = vi.spyOn(PullRequestReviewerRemoved.prototype as any, 'handle');


            await strategyTestSetup.probot.receive({
                id: '123',
                name: 'pull_request',
                payload: pullRequestReviewerRemovedPayload as any,
            });


            strategyTestSetup.performCommonAssertions(expectedCaseSlug);


        });
    });
});