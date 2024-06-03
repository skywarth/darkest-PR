import PullRequestStrategy, {OctokitResponsePullRequest} from "./PullRequestStrategy.js";
import {Context} from "probot";
import {Emotion} from "../../enums/Emotion.js";
import {Sentiment} from "../../enums/Sentiment.js";
import {Quote} from "../../Quote.js";
import {QuoteFacade} from "../../QuoteFacade.js";
import Comment from "../../Comment.js";
import {components} from "@octokit/openapi-types";


export type OctokitResponsePullRequestReview = components["schemas"]["pull-request-review"];//Alternative: RestEndpointMethodTypes["pulls"]["listReviews"]["response"]["data"] using import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";


export default class PullRequestClosedStrategy extends PullRequestStrategy<'pull_request.closed'>{
    protected async executePrStrategy(ghContext: Context<'pull_request.closed'>,previousPRs:Array<OctokitResponsePullRequest>): Promise<void> {


        let tags: Array<string>=['close','end','finish','fail','failure','reject','denied','cancel'];
        let contextEmotionMetrics: Array<Emotion.EmotionMetric>=[
            {emotion: Emotion.Anger.Rage, temperature: 3},
            {emotion: Emotion.Anger.Irritation, temperature: 4},
            {emotion: Emotion.Sadness.Grief, temperature: 1},
            {emotion: Emotion.Fear.Panic, temperature: 2},
            {emotion: Emotion.Sadness.Sorrow, temperature: 3},
            {emotion: Emotion.Disgust.Scorn, temperature: 3},
        ];
        let caseSlug: string;
        let sentiment :Sentiment=Sentiment.Negative;

        const reviews:Array<OctokitResponsePullRequestReview>=  (await ghContext.octokit.pulls.listReviews({
            owner: ghContext.payload.repository.owner.login,
            repo: ghContext.payload.repository.name,
            pull_number: ghContext.payload.pull_request.number
        })).data;

        const reviewCommentsAmount:number=ghContext.payload.pull_request.review_comments

        if(reviews.length>3 || reviewCommentsAmount>25){
            //CASE: Long discussion/review
            caseSlug='pr-closed.many-reviews';
            tags=[...tags,'effort','investment','time','support','alter','change','help','attempt','battle','struggle','labor','stress','strain','too much','exhaustion','cannot','impossible','despair','fed up','enough']
            contextEmotionMetrics=[
                ...contextEmotionMetrics,
                {emotion: Emotion.Anger.Fury, temperature: 5},
                {emotion: Emotion.Fear.Terror, temperature: 3},
                {emotion: Emotion.Shame.Embarrassment, temperature:5},
                {emotion: Emotion.Disgust.Hatred, temperature:4},
            ]
        }else if(reviews.length>0 || reviewCommentsAmount>0){
            //CASE: Short discussion/review
            caseSlug='pr-closed.few-reviews';
            tags=[...tags,'disbelief','cancel','ignore','unfaithful','neglect','overlook','scorn','avoid','evade','evasion'];
            contextEmotionMetrics=[
                ...contextEmotionMetrics,
                {emotion: Emotion.Disgust.Contempt, temperature: 4},
                {emotion: Emotion.Fear.Anxiety, temperature: 3},
                {emotion: Emotion.Sadness.Melancholy, temperature: 2},
                {emotion: Emotion.Surprise.Wonder, temperature: 3},
            ]
        }else{
            //CASE: No discussion/review
            caseSlug='pr-closed.no-review';
            tags=[...tags,'ignore','overlook','scorn','avoid','evade','evasion','abandon','disregard','disrespect','contempt','neglect','negligence','oversight','disfavor','oblivion','silence','abyss','void']
            contextEmotionMetrics=[
                ...contextEmotionMetrics,
                {emotion: Emotion.Disgust.Contempt, temperature: 3},
                {emotion: Emotion.Anger.Wrath, temperature: 4},
                {emotion: Emotion.Sadness.Melancholy, temperature:4},
                {emotion: Emotion.Sadness.Loneliness, temperature: 5},
                {emotion: Emotion.Fear.Fright, temperature: 2},
                {emotion: Emotion.Surprise.Wonder, temperature: 5},
            ]
        }

        if(previousPRs.length>0){
            caseSlug='pr-closed.previously-closed';
            tags=[...tags,'retry','attempt','try','again','hopeless','endless'];
            contextEmotionMetrics=[
                ...contextEmotionMetrics,
                {emotion: Emotion.Sadness.Despair, temperature: 5},
            ]
        }

        //Prune duplicates, if needed. Below:
        //const map = new Map(all_filter_ids.map(pos => [pos.id, pos]));
        // const uniques = [...map.values()];

        const quote: Quote = QuoteFacade.getInstance().getQuote(sentiment, contextEmotionMetrics, tags);
        const comment: Comment = new Comment(quote, caseSlug, contextEmotionMetrics)

        const issueComment = ghContext.issue(comment.getObject());
        ghContext.octokit.issues.createComment(issueComment);
        return;









    }

}