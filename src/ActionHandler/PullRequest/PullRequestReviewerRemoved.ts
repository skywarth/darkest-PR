import PullRequestStrategy, {OctokitResponsePullRequest} from "./PullRequestStrategy.js";
import {Context} from "probot";
import {Emotion} from "../../enums/Emotion.js";
import {Sentiment} from "../../enums/Sentiment.js";
import {ActionContextDTO} from "../../DTO/ActionContextDTO.js";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {CommentFactory} from "../../Comment/CommentFactory.js";


export default class PullRequestReviewerRemoved extends PullRequestStrategy<'pull_request.review_request_removed'>{


    protected getEventName(): EmitterWebhookEventName {
        return "pull_request.review_request_removed";
    }

    protected async executePrStrategy(ghContext: Context<'pull_request.review_request_removed'>,commentFactory:CommentFactory,_previousPRs:Array<OctokitResponsePullRequest>): Promise<void> {


        let tags: Array<string>=['removed','sent','kicked','denied','deny','fire','fired','detach','separated','parted','death','die','kill','killed','destroyed','begone','scram','scoot','leave','left','away','depart','fall','fell','ban','banned','disowned','rejected','dismissed','shunned','assignment','review','request','duty','demand','audit','inspection','assess','assessment','evaluation','judgement',];
        let contextEmotionMatrix: Emotion.EmotionMatrix=[
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



        const actionContext=new ActionContextDTO(contextEmotionMatrix,sentiment,tags);
        const comment = commentFactory.create(caseSlug,actionContext);
        if(comment){
            const issueComment = ghContext.issue(comment.getObject());
            ghContext.octokit.issues.createComment(issueComment);
        }

        return;









    }

}