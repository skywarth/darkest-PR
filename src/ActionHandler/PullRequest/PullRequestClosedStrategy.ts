import PullRequestStrategy, {OctokitResponsePullRequest} from "./PullRequestStrategy.js";
import {Emotion} from "../../enums/Emotion.js";
import {Sentiment} from "../../enums/Sentiment.js";
import {components} from "@octokit/openapi-types";
import {ActionContextDTO} from "../../DTO/ActionContextDTO.js";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {CommentFactory} from "../../Comment/CommentFactory.js";
import Comment from "../../Comment/Comment";
import {CaseSlugs} from "../../enums/CaseSlug.js";


export type OctokitResponsePullRequestReview = components["schemas"]["pull-request-review"];//Alternative: RestEndpointMethodTypes["pulls"]["listReviews"]["response"]["data"] using import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";


export default class PullRequestClosedStrategy extends PullRequestStrategy<'pull_request.closed'>{

    protected getEventName(): EmitterWebhookEventName {
        return "pull_request.closed";
    }

    protected async executePrStrategy(commentFactory:CommentFactory,previousPRs:Array<OctokitResponsePullRequest>): Promise<Comment|null> {


        let tags: Array<string>=['close','end','finish',];
        let contextEmotionMatrix: Emotion.EmotionMatrix;
        let caseSlug: CaseSlugs.Types;
        let sentiment :Sentiment;

        const limitDefinitions={
            many:{
                reviews:3,
                comments:25
            },
            few:{
                reviews:0,
                comments:0,
            }
        };

        const reviews:Array<OctokitResponsePullRequestReview>=  (await this.ghContext.octokit.pulls.listReviews({
            owner: this.ghContext.payload.repository.owner.login,
            repo: this.ghContext.payload.repository.name,
            pull_number: this.ghContext.payload.pull_request.number
        })).data;

        const reviewCommentsAmount:number=this.ghContext.payload.pull_request.review_comments

        if(this.ghContext.payload.pull_request.merged){
            //CASE: Merged
            tags=[...tags,'win','won','victory','victorious'];
            contextEmotionMatrix=[
                {emotion: Emotion.Joy.Relief, temperature: 2},
                {emotion: Emotion.Joy.Happiness, temperature: 4},
                {emotion: Emotion.Joy.Enjoyment, temperature: 3},
            ];
            sentiment=Sentiment.Positive;
            if(reviews.length>limitDefinitions.many.reviews || reviewCommentsAmount>limitDefinitions.many.comments){
                //CASE: Long discussion/review
                caseSlug=CaseSlugs.PullRequest.Closed.MergedManyReviews;
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
            }else if(reviews.length>limitDefinitions.few.reviews || reviewCommentsAmount>limitDefinitions.few.comments){
                //CASE: Short discussion/review
                caseSlug=CaseSlugs.PullRequest.Closed.MergedFewReviews;
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
                    {emotion: Emotion.Surprise.Wonder, temperature: 5},
                    {emotion: Emotion.Surprise.Shock, temperature: 3},
                ];
            }else{
                //CASE: No discussion/review
                caseSlug=CaseSlugs.PullRequest.Closed.MergedNoReviews;
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
            if(reviews.length>limitDefinitions.many.reviews || reviewCommentsAmount>limitDefinitions.many.comments){
                //CASE: Long discussion/review
                caseSlug=CaseSlugs.PullRequest.Closed.NotMergedManyReviews;
                tags=[...tags,'effort','investment','time','support','alter','change','help','attempt','battle','struggle','labor','stress','strain','too much','exhaustion','cannot','impossible','despair','fed up','enough']
                contextEmotionMatrix=[
                    ...contextEmotionMatrix,
                    {emotion: Emotion.Anger.Fury, temperature: 5},
                    {emotion: Emotion.Fear.Terror, temperature: 3},
                    {emotion: Emotion.Shame.Embarrassment, temperature:5},
                    {emotion: Emotion.Disgust.Hatred, temperature:4},
                ]
            }else if(reviews.length>limitDefinitions.few.reviews || reviewCommentsAmount>limitDefinitions.few.comments){
                //CASE: Short discussion/review
                caseSlug=CaseSlugs.PullRequest.Closed.NotMergedFewReviews;
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
                caseSlug=CaseSlugs.PullRequest.Closed.NotMergedNoReviews;
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
                //TODO: consider array of caseSlugs because of this
                caseSlug=CaseSlugs.PullRequest.Closed.NotMergedPreviouslyClosed;
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