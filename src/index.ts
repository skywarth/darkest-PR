import {Context, Probot} from "probot";
import {QuoteFacade} from "./QuoteFacade.js";
import PullRequestOpenedStrategy from "./ActionHandler/PullRequest/PullRequestOpenedStrategy.js";
import PullRequestClosedStrategy from "./ActionHandler/PullRequest/PullRequestClosedStrategy.js";
import {Sentiment} from "./enums/Sentiment";
import {Emotion} from "./enums/Emotion";


export default (app: Probot) => {

  const quoteFacade=new QuoteFacade();
  app.on("pull_request.opened", new PullRequestOpenedStrategy().handle);

  app.on("pull_request.closed", new PullRequestClosedStrategy().handle);

  app.on("issue_comment.created", async (context:Context<'issue_comment.created'>) => {


    quoteFacade.getQuote(Sentiment.Neutral,[Emotion.Joy.Happiness]);

    context.log.info(context.payload.action);

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
