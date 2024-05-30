import PullRequestStrategy from "./PullRequestStrategy.js";
import {Context} from "probot";

export default class PullRequestClosedStrategy extends PullRequestStrategy{
    protected executePrStrategy(ghContext: Context): void {

        const issueComment = ghContext.issue({
            body: "get closed lmao",
        });

        ghContext.octokit.issues.createComment(issueComment);
    }

}