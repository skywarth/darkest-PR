import PullRequestStrategy, {OctokitResponsePullRequest} from "./PullRequestStrategy.js";
import {Context} from "probot";

export default class PullRequestClosedStrategy extends PullRequestStrategy<'pull_request.closed'>{
    protected async executePrStrategy(ghContext: Context<'pull_request.closed'>,previousPRs:Array<OctokitResponsePullRequest>): Promise<void> {

        console.log(previousPRs);
        const issueComment = ghContext.issue({
            body: "get closed lmao",
        });

        ghContext.octokit.issues.createComment(issueComment);
    }

}