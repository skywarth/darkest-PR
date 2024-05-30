import PullRequestStrategy from "./PullRequestStrategy.js";
import {Context} from "probot";

export default class PullRequestOpenedStrategy extends PullRequestStrategy{
    protected executePrStrategy(ghContext: Context): void {
        const issueComment = ghContext.issue({
            body: "you opened a PR",
        });

        ghContext.octokit.issues.createComment(issueComment);
    }

}