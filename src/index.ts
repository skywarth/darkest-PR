import {Context, Probot} from "probot";
import PullRequestOpenedStrategy from "./ActionHandler/PullRequest/PullRequestOpenedStrategy.js";
import PullRequestClosedStrategy from "./ActionHandler/PullRequest/PullRequestClosedStrategy.js";
import PullRequestReviewSubmittedStrategy from "./ActionHandler/PullRequestReview/PullRequestReviewSubmittedStrategy.js";
import IssueCommentCreatedStrategy from "./ActionHandler/IssueComment/IssueCommentCreatedStrategy.js";



export default (app: Probot) => {

    app.on("pull_request.opened", async (ghContext: Context<'pull_request.opened'>) => {
        const strat = new PullRequestOpenedStrategy();
        return strat.handle(ghContext);
    });

    app.on("pull_request.closed", async (ghContext: Context<'pull_request.closed'>) => {
      const strat = new PullRequestClosedStrategy();
      return strat.handle(ghContext);
    });

    app.on("pull_request_review.submitted", async (ghContext: Context<'pull_request_review.submitted'>) => {
        const strat = new PullRequestReviewSubmittedStrategy();
        return strat.handle(ghContext);
    });

    app.on("issue_comment.created", async (ghContext: Context<'issue_comment.created'>) => {
        const strat = new IssueCommentCreatedStrategy();
        return strat.handle(ghContext);
    });

  /*app.on("issue_comment.created", async (context:Context<'issue_comment.created'>) => {



    const issueComment = context.issue({
      body: "We are many, you're but one",
    });
    //if(context.payload.comment.user.type!=='Bot'){
    if(!context.isBot){
      await context.octokit.issues.createComment(issueComment);
    }

  });
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/*/
};