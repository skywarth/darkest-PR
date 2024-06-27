import {describe, test, afterEach, vi, beforeAll, expect} from "vitest";
import {CaseSlugs} from "../../../src/enums/CaseSlug";
import PullRequestOpenedStrategy from "../../../src/ActionHandler/PullRequest/PullRequestOpenedStrategy";




import pullRequestOpenedPayload from '../../fixtures/events/pull_request/pull_request.opened.json';
import pullRequestListNotMerged from '../../fixtures/data/pulls/pulls.list.not-merged.json';
import pullRequestListMerged from '../../fixtures/data/pulls/pulls.list.merged.json';
import {StrategyTestSetup} from "../strategyTestSetup";


describe("Pull Request opened tests", () => {
    const strategyTestSetup = new StrategyTestSetup();

    beforeAll(() => {
        strategyTestSetup.beforeAll();
    });

    afterEach(() => {
        strategyTestSetup.afterEach();
    });

    describe.each([
        {
            description: "No previous PRs",
            previousPrs: [],
            expectedCaseSlug: CaseSlugs.PullRequest.Opened.Fresh,
        },
        {
            description: "Previously not merged (closed)",
            previousPrs: pullRequestListNotMerged,
            expectedCaseSlug: CaseSlugs.PullRequest.Opened.PreviouslyClosed,
        },
        {
            description: "Previously merged",
            previousPrs: pullRequestListMerged,
            expectedCaseSlug: CaseSlugs.PullRequest.Opened.PreviouslyMerged,
        },
    ])('$description', ({ previousPrs, expectedCaseSlug }) => {
        test('Creates a comment after receiving the event', async () => {
            strategyTestSetup.actionStrategyHandleSpy = vi.spyOn(PullRequestOpenedStrategy.prototype as any, 'handle');
            strategyTestSetup.pullRequestIndexResponseMock.mockImplementation(() => previousPrs);

            await strategyTestSetup.probot.receive({
                id: '123',
                name: 'pull_request',
                payload: pullRequestOpenedPayload as any,
            });

            strategyTestSetup.performCommonAssertions(expectedCaseSlug);

            expect(strategyTestSetup.pullRequestIndexResponseMock).toHaveBeenCalledOnce();


        });
    });
});