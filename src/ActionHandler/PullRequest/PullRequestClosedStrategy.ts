import PullRequestStrategy from "./PullRequestStrategy.js";
import {Context} from "probot";

export default class PullRequestClosedStrategy extends PullRequestStrategy<'pull_request.closed'>{
    protected executePrStrategy(ghContext: Context<'pull_request.closed'>): void {

        const issueComment = ghContext.issue({
            body: "get closed lmao",
        });

        ghContext.octokit.issues.createComment(issueComment);
    }

}