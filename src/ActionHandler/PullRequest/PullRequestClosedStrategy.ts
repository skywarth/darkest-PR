import PullRequestStrategy, {OctokitResponsePullRequest} from "./PullRequestStrategy.js";
import {Context} from "probot";
import {Emotion} from "../../enums/Emotion.js";
import {Sentiment} from "../../enums/Sentiment.js";
import {components} from "@octokit/openapi-types";
import {ActionContextDTO} from "../../DTO/ActionContextDTO.js";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {CommentFactory} from "../../Comment/CommentFactory.js";
import Comment from "../../Comment/Comment";


export type OctokitResponsePullRequestReview = components["schemas"]["pull-request-review"];//Alternative: RestEndpointMethodTypes["pulls"]["listReviews"]["response"]["data"] using import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";


export default class PullRequestClosedStrategy extends PullRequestStrategy<'pull_request.closed'>{

    protected getEventName(): EmitterWebhookEventName {
        return "pull_request.closed";
    }

    protected async executePrStrategy(ghContext: Context<'pull_request.closed'>,commentFactory:CommentFactory,previousPRs:Array<OctokitResponsePullRequest>): Promise<Comment|null> {


        let tags: Array<string>=['close','end','finish',];
        let contextEmotionMatrix: Emotion.EmotionMatrix;
        let caseSlug: string;
        let sentiment :Sentiment;

        const reviews:Array<OctokitResponsePullRequestReview>=  (await ghContext.octokit.pulls.listReviews({
            owner: ghContext.payload.repository.owner.login,
            repo: ghContext.payload.repository.name,
            pull_number: ghContext.payload.pull_request.number
        })).data;

        const reviewCommentsAmount:number=ghContext.payload.pull_request.review_comments

        if(ghContext.payload.pull_request.merged){
            //CASE: Merged
            tags=[...tags,'win','won','victory','victorious'];
            contextEmotionMatrix=[
                {emotion: Emotion.Joy.Relief, temperature: 2},
                {emotion: Emotion.Joy.Happiness, temperature: 4},
                {emotion: Emotion.Joy.Enjoyment, temperature: 3},
            ];
            sentiment=Sentiment.Positive;
            if(reviews.length>3 || reviewCommentsAmount>25){
                //CASE: Long discussion/review
                caseSlug='pr-closed.merged.many-reviews';
                tags=[...tags,'finally','at last','executed','destroyed','glorious','victorious','victory','relief','unwavering','unyielding','champion','comeback','improvement','revival','resurgence'];
                contextEmotionMatrix=[
                    ...contextEmotionMatrix,
                    {emotion: Emotion.Joy.Relief, temperature: 5},
                    {emotion: Emotion.Joy.Thrill, temperature: 3},
                    {emotion: Emotion.Joy.Ecstasy, temperature: 4},
                    {emotion: Emotion.Interest.Acceptance, temperature: 2},
                    {emotion: Emotion.Surprise.Amazement, temperature: 3},
                    {emotion: Emotion.Anger.Wrath, temperature: 5},
                ];
            }else if(reviews.length>0 || reviewCommentsAmount>0){
                //CASE: Short discussion/review
                caseSlug='pr-closed.merged.few-reviews';
                tags=[...tags,'confidence','easy','kicked','easily','defeated','professional','masterfully','talented','keen','learn','clever','quick','fast','haste'];
                contextEmotionMatrix=[
                    ...contextEmotionMatrix,
                    {emotion: Emotion.Joy.Relief, temperature: 1},
                    {emotion: Emotion.Joy.Ecstasy, temperature: 5},
                    {emotion: Emotion.Joy.Enjoyment, temperature: 4},
                    {emotion: Emotion.Joy.Happiness, temperature: 4},
                    {emotion: Emotion.Interest.Acceptance, temperature: 3},
                    {emotion: Emotion.Interest.Friendliness, temperature: 4},
                    {emotion: Emotion.Interest.Trust, temperature: 2},
                    {emotion: Emotion.Interest.Kindness, temperature: 3},
                ];
            }else{
                //CASE: No discussion/review
                caseSlug='pr-closed.merged.no-review';
                tags=[...tags,'easy','easily','professional','masterfully','talented','keen','learn','clever','quick','fast','haste','destroyed','obliterated','god','godlike','overconfidence','trust','renown','honor','glory','confidence','greatness','owned','smart','incredible','unbelievable','extraordinary'];
                contextEmotionMatrix=[
                    ...contextEmotionMatrix,
                    {emotion: Emotion.Joy.Ecstasy, temperature: 2},
                    {emotion: Emotion.Joy.Enjoyment, temperature: 5},
                    {emotion: Emotion.Joy.Happiness, temperature: 3},
                    {emotion: Emotion.Interest.Acceptance, temperature: 5},
                    {emotion: Emotion.Interest.Friendliness, temperature: 5},
                    {emotion: Emotion.Interest.Trust, temperature: 5},
                    {emotion: Emotion.Interest.Kindness, temperature: 4},
                ];
            }
        }else{
            //CASE: Not merged
            tags=[...tags,'fail','failure','reject','denied','cancel'];
            contextEmotionMatrix=[
                {emotion: Emotion.Anger.Rage, temperature: 3},
                {emotion: Emotion.Anger.Irritation, temperature: 4},
                {emotion: Emotion.Sadness.Grief, temperature: 1},
                {emotion: Emotion.Fear.Panic, temperature: 2},
                {emotion: Emotion.Sadness.Sorrow, temperature: 3},
                {emotion: Emotion.Disgust.Scorn, temperature: 3},
            ];
            sentiment=Sentiment.Negative;
            if(reviews.length>3 || reviewCommentsAmount>25){
                //CASE: Long discussion/review
                caseSlug='pr-closed.not-merged.many-reviews';
                tags=[...tags,'effort','investment','time','support','alter','change','help','attempt','battle','struggle','labor','stress','strain','too much','exhaustion','cannot','impossible','despair','fed up','enough']
                contextEmotionMatrix=[
                    ...contextEmotionMatrix,
                    {emotion: Emotion.Anger.Fury, temperature: 5},
                    {emotion: Emotion.Fear.Terror, temperature: 3},
                    {emotion: Emotion.Shame.Embarrassment, temperature:5},
                    {emotion: Emotion.Disgust.Hatred, temperature:4},
                ]
            }else if(reviews.length>0 || reviewCommentsAmount>0){
                //CASE: Short discussion/review
                caseSlug='pr-closed.not-merged.few-reviews';
                tags=[...tags,'disbelief','cancel','ignore','unfaithful','neglect','overlook','scorn','avoid','evade','evasion'];
                contextEmotionMatrix=[
                    ...contextEmotionMatrix,
                    {emotion: Emotion.Disgust.Contempt, temperature: 4},
                    {emotion: Emotion.Fear.Anxiety, temperature: 3},
                    {emotion: Emotion.Sadness.Melancholy, temperature: 2},
                    {emotion: Emotion.Surprise.Wonder, temperature: 3},
                ]
            }else{
                //CASE: No discussion/review
                caseSlug='pr-closed.not-merged.no-review';
                tags=[...tags,'ignore','overlook','scorn','avoid','evade','evasion','abandon','disregard','disrespect','contempt','neglect','negligence','oversight','disfavor','oblivion','silence','abyss','void','conspiracy','betrayal','distrust']
                contextEmotionMatrix=[
                    ...contextEmotionMatrix,
                    {emotion: Emotion.Disgust.Contempt, temperature: 3},
                    {emotion: Emotion.Anger.Wrath, temperature: 4},
                    {emotion: Emotion.Sadness.Melancholy, temperature:4},
                    {emotion: Emotion.Sadness.Loneliness, temperature: 5},
                    {emotion: Emotion.Fear.Fright, temperature: 2},
                    {emotion: Emotion.Surprise.Wonder, temperature: 5},
                ]
            }

            if(previousPRs.length>0){
                caseSlug='pr-closed.not-merged.previously-closed';
                tags=[...tags,'retry','attempt','try','again','hopeless','endless','cycle','unending','despair','conspiracy','betrayal','distrust'];
                contextEmotionMatrix=[
                    ...contextEmotionMatrix,
                    {emotion: Emotion.Sadness.Despair, temperature: 5},
                ]
            }
        }



        //Prune duplicates, if needed. Below:
        //const map = new Map(all_filter_ids.map(pos => [pos.id, pos]));
        // const uniques = [...map.values()];

        const actionContext=new ActionContextDTO(contextEmotionMatrix,sentiment,tags);
        const comment = commentFactory.create(caseSlug,actionContext);
        return comment;

    }

}