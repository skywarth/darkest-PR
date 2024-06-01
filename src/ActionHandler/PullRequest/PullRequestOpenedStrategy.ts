import PullRequestStrategy from "./PullRequestStrategy.js";
import {Context} from "probot";
import {QuoteFacade} from "../../QuoteFacade.js";
import {Sentiment} from "../../enums/Sentiment.js";
import {Emotion} from "../../enums/Emotion.js";
import Comment from "../../Comment.js";
import {Quote} from "../../Quote.js";

export default class PullRequestOpenedStrategy extends PullRequestStrategy{
    protected executePrStrategy(ghContext: Context): void {

        const quoteFacade:QuoteFacade=new QuoteFacade();
        const contextEmotionMetrics:Array<Emotion.EmotionMetric>=[
            {emotion:Emotion.Anger.Fury,temperature:4},
            {emotion:Emotion.Disgust.Hatred,temperature:2}
        ];
        const quote:Quote=quoteFacade.getQuote(Sentiment.Negative,contextEmotionMetrics );

        const comment:Comment=new Comment(quote,'test-case',contextEmotionMetrics)


        const issueComment = ghContext.issue(comment.getObject());
        ghContext.octokit.issues.createComment(issueComment);
    }

}