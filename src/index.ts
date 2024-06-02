import {Context, Probot} from "probot";
import PullRequestOpenedStrategy from "./ActionHandler/PullRequest/PullRequestOpenedStrategy.js";
import PullRequestClosedStrategy from "./ActionHandler/PullRequest/PullRequestClosedStrategy.js";



export default (app: Probot) => {

    app.on("pull_request.opened", async (ghContext: Context<'pull_request.opened'>) => {
        const strat = new PullRequestOpenedStrategy();
        return strat.handle(ghContext);
    });

  app.on("pull_request.closed", new PullRequestClosedStrategy().handle);

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