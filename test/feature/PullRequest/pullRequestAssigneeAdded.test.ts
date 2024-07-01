import {describe, test, afterEach, vi, beforeAll} from "vitest";
import {StrategyTestSetup} from "../strategyTestSetup";
import PullRequestAssigneeAddedStrategy from "../../../src/ActionHandler/PullRequest/PullRequestAssigneeAddedStrategy";


import prAssigneeAddedPayload from '../../fixtures/events/pull_request/assignee/pull_request.assignee.added.json';
import {CaseSlugs} from "../../../src/enums/CaseSlug";



describe("Pull Request assignee added tests", () => {
    const strategyTestSetup = new StrategyTestSetup();


    beforeAll(() => {
        strategyTestSetup.beforeAll();
        strategyTestSetup.actionStrategyHandleSpy = vi.spyOn(PullRequestAssigneeAddedStrategy.prototype as any, 'handle');
    });

    afterEach(() => {
        strategyTestSetup.afterEach();
    });


    test("Creates comment", async () => {

        const caseSlug=CaseSlugs.PullRequest.Assignee.Added;

        await strategyTestSetup.probot.receive({
            id: '123',
            name: 'pull_request',
            payload: prAssigneeAddedPayload as any,
        });

        strategyTestSetup.performCommonAssertions(caseSlug);

    });



});