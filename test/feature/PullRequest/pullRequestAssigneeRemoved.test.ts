import {describe, test, afterEach, vi, beforeAll} from "vitest";
import {StrategyTestSetup} from "../strategyTestSetup";
import PullRequestAssigneeRemovedStrategy from "../../../src/ActionHandler/PullRequest/PullRequestAssigneeRemovedStrategy";
import {CaseSlugs} from "../../../src/enums/CaseSlug";

import prAssigneeRemovedPayload from '../../fixtures/events/pull_request/assignee/pull_request.assignee.removed.json';





describe("Pull Request assignee removed tests", () => {
    const strategyTestSetup = new StrategyTestSetup();


    beforeAll(() => {
        strategyTestSetup.beforeAll();
        strategyTestSetup.actionStrategyHandleSpy = vi.spyOn(PullRequestAssigneeRemovedStrategy.prototype as any, 'handle');
    });

    afterEach(() => {
        strategyTestSetup.afterEach();
    });


    test("Creates comment", async () => {

        const caseSlug=CaseSlugs.PullRequest.Assignee.Removed;

        await strategyTestSetup.probot.receive({
            id: '123',
            name: 'pull_request',
            payload: prAssigneeRemovedPayload as any,
        });

        strategyTestSetup.performCommonAssertions(caseSlug);

    });



});