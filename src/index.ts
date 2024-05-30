import { Probot } from "probot";
import {QuoteFacade} from "./QuoteFacade.js";
import PullRequestOpenedStrategy from "./ActionHandler/PullRequest/PullRequestOpenedStrategy.js";
import PullRequestClosedStrategy from "./ActionHandler/PullRequest/PullRequestClosedStrategy.js";

export default (app: Probot) => {

  const quoteFacade=new QuoteFacade();
  app.on("pull_request.opened", new PullRequestOpenedStrategy().handle);

  app.on("pull_request.closed", new PullRequestClosedStrategy().handle);

  app.on("issue_comment.created", async (context) => {


    quoteFacade.getQuote();

    context.log.info(context.payload);

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
  // https://probot.github.io/docs/development/
};
