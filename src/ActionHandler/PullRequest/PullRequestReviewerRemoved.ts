import PullRequestStrategy, {OctokitResponsePullRequest} from "./PullRequestStrategy.js";
import {Context} from "probot";
import {Emotion} from "../../enums/Emotion.js";
import {Sentiment} from "../../enums/Sentiment.js";
import {Quote} from "../../Quote/Quote.js";
import {QuoteFacade} from "../../Quote/QuoteFacade.js";
import Comment from "../../Comment.js";


export default class PullRequestReviewerRemoved extends PullRequestStrategy<'pull_request.review_request_removed'>{


    protected async executePrStrategy(ghContext: Context<'pull_request.review_request_removed'>,_previousPRs:Array<OctokitResponsePullRequest>): Promise<void> {


        let tags: Array<string>=['removed','sent','kicked','denied','deny','fire','fired','detach','separated','parted','death','die','kill','killed','destroyed','begone','scram','scoot','leave','left','away','depart','fall','fell','ban','banned','disowned','rejected','dismissed','shunned','assignment','review','request','duty','demand','audit','inspection','assess','assessment','evaluation','judgement',];
        let contextEmotionMetrics: Array<Emotion.EmotionMetric>=[
            {emotion:Emotion.Shame.Embarrassment,temperature:2},
            {emotion:Emotion.Shame.Guilt,temperature:3},
            {emotion:Emotion.Shame.Regret,temperature:1},
            {emotion:Emotion.Shame.Remorse,temperature:2},
            {emotion:Emotion.Anger.Fury,temperature:3},
            {emotion:Emotion.Anger.Wrath,temperature:5},
            {emotion:Emotion.Anger.Rage,temperature:1},
            {emotion:Emotion.Disgust.Scorn,temperature:4},
            {emotion:Emotion.Disgust.Contempt,temperature:2},
            {emotion:Emotion.Disgust.Hatred,temperature:2},
            {emotion:Emotion.Surprise.Shock,temperature:3},
            {emotion:Emotion.Sadness.Sorrow,temperature:4},
            {emotion:Emotion.Sadness.Grief,temperature:5},
        ];
        //TODO: use direct quoteSlugs
        let caseSlug: string='pull-request.reviewer-removed';
        let sentiment :Sentiment=Sentiment.Negative;



        const actionContext={emotionMetrics:contextEmotionMetrics,sentiment:sentiment,tags:tags};
        const quote: Quote|undefined = QuoteFacade.getInstance().getQuote(actionContext);
        if(quote){
            const comment: Comment = new Comment(quote, caseSlug, actionContext)

            const issueComment = ghContext.issue(comment.getObject());
            ghContext.octokit.issues.createComment(issueComment);
        }

        return;









    }

}