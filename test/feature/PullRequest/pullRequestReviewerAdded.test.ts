import {describe, test, afterEach, vi, beforeAll} from "vitest";
import {CaseSlugs} from "../../../src/enums/CaseSlug";
import {StrategyTestSetup} from "../strategyTestSetup";
import PullRequestReviewerAdded from "../../../src/ActionHandler/PullRequest/PullRequestReviewerAdded";


import pullRequestReviewerAddedPayload from '../../fixtures/events/pull_request/reviewer/pull_request.reviewer.added.json';


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
            description: "Reviewer added",
            expectedCaseSlug: CaseSlugs.PullRequest.Reviewer.Added,
        }
    ])('$description', ({ expectedCaseSlug }) => {
        test('Creates a comment after receiving the event', async () => {

            strategyTestSetup.actionStrategyHandleSpy = vi.spyOn(PullRequestReviewerAdded.prototype as any, 'handle');


            await strategyTestSetup.probot.receive({
                id: '123',
                name: 'pull_request',
                payload: pullRequestReviewerAddedPayload as any,
            });


            strategyTestSetup.performCommonAssertions(expectedCaseSlug);


        });
    });
});