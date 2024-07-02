import {describe, test, afterEach, vi, beforeAll} from "vitest";
import {StrategyTestSetup} from "../strategyTestSetup";
import IssueAssigneeRemovedStrategy from "../../../src/ActionHandler/Issue/IssueAssigneeRemovedStrategy";
import {CaseSlugs} from "../../../src/enums/CaseSlug";

import issueAssigneeRemovedPayload from '../../fixtures/events/issue/issue.assignee.removed.json';




describe("Issue assignee removed tests", () => {
    const strategyTestSetup = new StrategyTestSetup();


    beforeAll(() => {
        strategyTestSetup.beforeAll();
        strategyTestSetup.actionStrategyHandleSpy = vi.spyOn(IssueAssigneeRemovedStrategy.prototype as any, 'handle');
    });

    afterEach(() => {
        strategyTestSetup.afterEach();
    });


    test("Creates comment", async () => {

        const caseSlug=CaseSlugs.Issue.Assignee.Removed;

        await strategyTestSetup.probot.receive({
            id: '123',
            name: 'issues',
            payload: issueAssigneeRemovedPayload as any,
        });

        strategyTestSetup.performCommonAssertions(caseSlug);

    });



});