import {Context, Probot} from "probot";
import PullRequestOpenedStrategy from "./ActionHandler/PullRequest/PullRequestOpenedStrategy.js";
import PullRequestClosedStrategy from "./ActionHandler/PullRequest/PullRequestClosedStrategy.js";
import PullRequestReviewSubmittedStrategy from "./ActionHandler/PullRequestReview/PullRequestReviewSubmittedStrategy.js";
import IssueCommentCreatedStrategy from "./ActionHandler/IssueComment/IssueCommentCreatedStrategy.js";
import PullRequestReviewerAdded from "./ActionHandler/PullRequest/PullRequestReviewerAdded.js";
import PullRequestReviewerRemoved from "./ActionHandler/PullRequest/PullRequestReviewerRemoved.js";
import PullRequestAssigneeAddedStrategy from "./ActionHandler/PullRequest/PullRequestAssigneeAddedStrategy.js";
import PullRequestAssigneeRemovedStrategy from "./ActionHandler/PullRequest/PullRequestAssigneeRemovedStrategy.js";
import IssueAssigneeAddedStrategy from "./ActionHandler/Issue/IssueAssigneeAddedStrategy.js";
import IssueAssigneeRemovedStrategy from "./ActionHandler/Issue/IssueAssigneeRemovedStrategy.js";



export default (app: Probot) => {

    app.on("pull_request.opened", async (ghContext: Context<'pull_request.opened'>) => {
        const strat = new PullRequestOpenedStrategy(ghContext);
        return strat.handle();
    });

    app.on("pull_request.closed", async (ghContext: Context<'pull_request.closed'>) => {
      const strat = new PullRequestClosedStrategy(ghContext);
      return strat.handle();
    });

    app.on("pull_request_review.submitted", async (ghContext: Context<'pull_request_review.submitted'>) => {
        const strat = new PullRequestReviewSubmittedStrategy(ghContext);
        return strat.handle();
    });

    app.on("pull_request.review_requested", async (ghContext: Context<'pull_request.review_requested'>) => {
        const strat = new PullRequestReviewerAdded(ghContext);
        return strat.handle();
    });

    app.on("pull_request.review_request_removed", async (ghContext: Context<'pull_request.review_request_removed'>) => {
        const strat = new PullRequestReviewerRemoved(ghContext);
        return strat.handle();
    });

    app.on("pull_request.assigned", async (ghContext: Context<'pull_request.assigned'>) => {
        const strat = new PullRequestAssigneeAddedStrategy(ghContext);
        return strat.handle();
    });

    app.on("pull_request.unassigned", async (ghContext: Context<'pull_request.unassigned'>) => {
        const strat = new PullRequestAssigneeRemovedStrategy(ghContext);
        return strat.handle();
    });


    app.on("issue_comment.created", async (ghContext: Context<'issue_comment.created'>) => {
        const strat = new IssueCommentCreatedStrategy(ghContext);
        return strat.handle();
    });

    app.on("issues.assigned", async (ghContext: Context<'issues.assigned'>) => {
        const strat = new IssueAssigneeAddedStrategy(ghContext);
        return strat.handle();
    });

    app.on("issues.unassigned", async (ghContext: Context<'issues.unassigned'>) => {
        const strat = new IssueAssigneeRemovedStrategy(ghContext);
        return strat.handle();
    });

};