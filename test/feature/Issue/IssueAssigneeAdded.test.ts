import {describe, test, afterEach, vi, beforeAll} from "vitest";
import {StrategyTestSetup} from "../strategyTestSetup";
import IssueAssigneeAddedStrategy from "../../../src/ActionHandler/Issue/IssueAssigneeAddedStrategy";


import issueAssigneeAddedPayload from '../../fixtures/events/issue/issue.assignee.added.json';
import {CaseSlugs} from "../../../src/enums/CaseSlug";



describe("Issue assignee added tests", () => {
    const strategyTestSetup = new StrategyTestSetup();


    beforeAll(() => {
        strategyTestSetup.beforeAll();
        strategyTestSetup.actionStrategyHandleSpy = vi.spyOn(IssueAssigneeAddedStrategy.prototype as any, 'handle');
    });

    afterEach(() => {
        strategyTestSetup.afterEach();
    });


    test("Creates comment", async () => {

        const caseSlug=CaseSlugs.Issue.Assignee.Added;

        await strategyTestSetup.probot.receive({
            id: '123',
            name: 'issues',
            payload: issueAssigneeAddedPayload as any,
        });

        strategyTestSetup.performCommonAssertions(caseSlug);

    });



});