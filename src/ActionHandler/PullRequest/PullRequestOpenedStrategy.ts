import PullRequestStrategy from "./PullRequestStrategy.js";
import {Context} from "probot";
import {QuoteFacade} from "../../QuoteFacade.js";
import {Sentiment} from "../../enums/Sentiment.js";
import {Emotion} from "../../enums/Emotion.js";
import Comment from "../../Comment.js";
import {Quote} from "../../Quote.js";

export default class PullRequestOpenedStrategy extends PullRequestStrategy{
    protected executePrStrategy(ghContext: Context): void {


        //CASE: Fresh
        let tags:Array<string>=['begin','start','create','open'];
        let contextEmotionMetrics:Array<Emotion.EmotionMetric>=[
            {emotion:Emotion.Joy.Happiness,temperature:2},
            {emotion:Emotion.Joy.Relief,temperature:4},
            {emotion:Emotion.Joy.Ecstasy,temperature:1}
        ];
        let caseSlug:string='pr-opened-fresh';
        const sentiment=Sentiment.Neutral;

        //CASE: Re-open, previous is cancelled






        const quote:Quote=QuoteFacade.getInstance().getQuote(sentiment,contextEmotionMetrics,tags);
        const comment:Comment=new Comment(quote,caseSlug,contextEmotionMetrics)


        const issueComment = ghContext.issue(comment.getObject());
        ghContext.octokit.issues.createComment(issueComment);
    }

}