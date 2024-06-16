import {Emotion} from "../../enums/Emotion.js";
import {Sentiment} from "../../enums/Sentiment.js";

import PullRequestReviewStrategy from "./PullRequestReviewStrategy.js";
import {ActionContextDTO} from "../../DTO/ActionContextDTO.js";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {CommentFactory} from "../../Comment/CommentFactory.js";
import Comment from "../../Comment/Comment";


export default class PullRequestReviewSubmittedStrategy extends PullRequestReviewStrategy<'pull_request_review.submitted'>{

    protected getEventName(): EmitterWebhookEventName {
        return "pull_request_review.submitted";
    }


    protected async executePrReviewStrategy(commentFactory:CommentFactory): Promise<Comment|null> {


        let tags: Array<string>=['review','revise','inspect','peek','watch','judge','judgement','judged','conscious','weighed','ponder','decision','verdict','ruling','decree','conclusion','sentence','analysis','determination','assessment','opinion','belief'];
        let contextEmotionMatrix: Emotion.EmotionMatrix;
        let caseSlug: string;
        let sentiment :Sentiment;

        const reviewVerdict=this.ghContext.payload.review.state;
        if(reviewVerdict==='approved'){
            //CASE: Approved
            caseSlug='pull-request-review.approved';
            sentiment=Sentiment.Positive;
            tags=[...tags,'success','victory','victorious','decimated','executed','approval','blessing','confirm','approve','endorsement','ratification','allow','permit','accepted','support','favor','praise','applaud','great','glory']
            contextEmotionMatrix=[
                {emotion: Emotion.Joy.Relief, temperature: 3},
                {emotion: Emotion.Joy.Happiness, temperature: 3},
                {emotion: Emotion.Joy.Enjoyment, temperature: 2},
                {emotion: Emotion.Joy.Ecstasy, temperature: 4},
                {emotion: Emotion.Interest.Kindness, temperature: 3},
                {emotion: Emotion.Interest.Acceptance, temperature: 5},
                {emotion: Emotion.Interest.Friendliness, temperature: 4},
                {emotion: Emotion.Interest.Trust, temperature: 4},
            ];
        }else if(reviewVerdict==='changes_requested'){
            //CASE: Change Requested, rejected
            caseSlug='pull-request-review.rejected';
            sentiment=Sentiment.Negative;
            tags=[...tags,'fail','failure','defeat','denied','deny','removed','beat','beaten','decline','reject','request','change','alter','improve','disqualified','blocked','missed','dismissed','repelled','disowned','weak','insufficient','low','lowly','fool','feeble','sluggish','brutish','brute','wasted','soft','incapable','poor','dull','lacking','missing','raw','unsatisfactory','unqualified','unprepared','incomplete','fall'];
            contextEmotionMatrix=[
                {emotion: Emotion.Anger.Frustration, temperature: 5},
                {emotion: Emotion.Anger.Fury, temperature: 3},//Frustration, and fury...
                {emotion: Emotion.Anger.Rage, temperature: 3},
                {emotion: Emotion.Anger.Irritation, temperature: 2},
                {emotion: Emotion.Sadness.Grief, temperature: 2},
                {emotion: Emotion.Sadness.Despair, temperature: 1},
                {emotion: Emotion.Sadness.Melancholy, temperature: 2},
                {emotion: Emotion.Fear.Terror, temperature: 3},
                {emotion: Emotion.Shame.Embarrassment, temperature: 4},
                {emotion: Emotion.Shame.Guilt, temperature: 2},
                {emotion: Emotion.Shame.Remorse, temperature: 1},
                {emotion: Emotion.Disgust.Hatred, temperature: 2},
                {emotion: Emotion.Disgust.Scorn, temperature: 5},
                {emotion: Emotion.Disgust.Contempt, temperature: 3},
            ];
        }else{
            //CASE: Just Comment
            caseSlug='pull-request-review.commented';
            sentiment=Sentiment.Neutral;
            tags=[...tags,'advised','suggested','advice','commend','command','order','encourage','instruct','recommend','warn','counsel','guide','lead','disclose','train','tutor','enlighten','support','steer','obey']
            contextEmotionMatrix=[
                {emotion: Emotion.Interest.Trust, temperature: 1},
                {emotion: Emotion.Interest.Acceptance, temperature: 2},
                {emotion: Emotion.Interest.Kindness, temperature: 3},
                {emotion: Emotion.Interest.Friendliness, temperature: 5},
                {emotion: Emotion.Surprise.Amazement, temperature: 1},
                {emotion: Emotion.Surprise.Wonder, temperature: 2},
            ];
        }




        const actionContext=new ActionContextDTO(contextEmotionMatrix,sentiment,tags);
        const comment = commentFactory.create(caseSlug,actionContext);
        return comment;

    }

}