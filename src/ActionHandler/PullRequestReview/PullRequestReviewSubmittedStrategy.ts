import {Context} from "probot";
import {Emotion} from "../../enums/Emotion.js";
import {Sentiment} from "../../enums/Sentiment.js";
import {Quote} from "../../Quote.js";
import {QuoteFacade} from "../../QuoteFacade.js";
import Comment from "../../Comment.js";
import PullRequestReviewStrategy from "./PullRequestReviewStrategy.js";


export default class PullRequestReviewSubmittedStrategy extends PullRequestReviewStrategy<'pull_request_review.submitted'>{

    protected async executePrReviewStrategy(ghContext: Context<'pull_request_review.submitted'>): Promise<void> {


        let tags: Array<string>=['review','revise','inspect','peek','watch','judge','judgement','judged','conscious','weighed','ponder','decision','verdict','ruling','decree','conclusion','sentence','analysis','determination','assessment','opinion','belief'];
        let contextEmotionMetrics: Array<Emotion.EmotionMetric>;
        let caseSlug: string;
        let sentiment :Sentiment;

        const reviewVerdict=ghContext.payload.review.state;
        if(reviewVerdict==='approved'){
            //CASE: Approved
            caseSlug='pull-request-review.approved';
            sentiment=Sentiment.Positive;
            tags=[...tags,'success','victory','victorious','decimated','executed','approval','blessing','confirm','approve','endorsement','ratification','allow','permit','accepted','support','favor','praise','applaud','great','glory']
            contextEmotionMetrics=[
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
            contextEmotionMetrics=[
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
            contextEmotionMetrics=[
                {emotion: Emotion.Interest.Trust, temperature: 1},
                {emotion: Emotion.Interest.Acceptance, temperature: 2},
                {emotion: Emotion.Interest.Kindness, temperature: 3},
                {emotion: Emotion.Interest.Friendliness, temperature: 5},
                {emotion: Emotion.Surprise.Amazement, temperature: 1},
                {emotion: Emotion.Surprise.Wonder, temperature: 2},
            ];
        }




        const actionContext={emotionMetrics:contextEmotionMetrics,sentiment:sentiment,tags:tags};
        const quote: Quote|undefined = QuoteFacade.getInstance().getQuote(actionContext);
        if(quote){
            const comment: Comment = new Comment(quote, caseSlug, actionContext)
            const issueComment = ghContext.issue(comment.getObject());
            console.log(issueComment);
            ghContext.octokit.issues.createComment(issueComment);
        }

        return;









    }

}