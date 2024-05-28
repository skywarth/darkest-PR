import { Probot } from "probot";
import {QuoteFacade} from "./QuoteFacade";

export default (app: Probot) => {

  const quoteFacade=new QuoteFacade();
  app.on("issues.opened", async (context) => {

    context.log.info(context.payload);

    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    await context.octokit.issues.createComment(issueComment);
  });

  app.on("issue_comment.created", async (context) => {


    quoteFacade.getQuote();

    context.log.info(context.payload);

    const issueComment = context.issue({
      body: "We are many, you're but one",
    });
    if(context.payload.comment.user.type!=='Bot'){
      await context.octokit.issues.createComment(issueComment);
    }

  });
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
