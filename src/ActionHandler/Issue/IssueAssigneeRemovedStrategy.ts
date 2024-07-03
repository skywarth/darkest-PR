import {Emotion} from "../../enums/Emotion.js";
import {Sentiment} from "../../enums/Sentiment.js";
import {ActionContextDTO} from "../../DTO/ActionContextDTO.js";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {CommentFactory} from "../../Comment/CommentFactory.js";
import Comment from "../../Comment/Comment.js";
import {CaseSlugs} from "../../enums/CaseSlug.js";
import IssueStrategy from "./IssueStrategy.js";


export default class IssueAssigneeRemovedStrategy extends IssueStrategy<'issues.unassigned'>{


    protected getEventName(): EmitterWebhookEventName {
        return "issues.unassigned";
    }


    protected async executeIssueStrategy(commentFactory:CommentFactory): Promise<Comment|null> {


        let tags: Array<string>=['detach','dispatched','separated','alone','solemn','thrown','sent','kicked','denied','deny','fire','fired','parted','death','die','kill','killed','destroyed','begone','scram','scoot','leave','left','away','depart','fall','fell','ban','banned','disowned','rejected','dismissed','shunned','assignment','request','duty','demand','audit','inspection','assess','assessment','evaluation','judgement','removed','abandoned','fall','fell','destroyed','oblivion','abandon'];
        let contextEmotionMatrix: Emotion.EmotionMatrix=[
            {emotion:Emotion.Shame.Regret,temperature:1},
            {emotion:Emotion.Shame.Remorse,temperature:3},
            {emotion:Emotion.Anger.Fury,temperature:3},
            {emotion:Emotion.Anger.Wrath,temperature:4},
            {emotion:Emotion.Anger.Rage,temperature:2},
            {emotion:Emotion.Disgust.Scorn,temperature:4},
            {emotion:Emotion.Disgust.Contempt,temperature:2},
            {emotion:Emotion.Disgust.Hatred,temperature:2},
            {emotion:Emotion.Surprise.Shock,temperature:2},
            {emotion:Emotion.Sadness.Sorrow,temperature:4},
            {emotion:Emotion.Sadness.Grief,temperature:5},
            {emotion:Emotion.Fear.Panic,temperature:3},
            {emotion:Emotion.Fear.Terror,temperature:5},
            {emotion:Emotion.Fear.Anxiety,temperature:2},
            {emotion:Emotion.Fear.Fright,temperature:1},
            {emotion:Emotion.Shame.Embarrassment,temperature:2},
            {emotion:Emotion.Shame.Guilt,temperature:3},
        ];

        let caseSlug: CaseSlugs.Types=CaseSlugs.Issue.Assignee.Removed;
        let sentiment :Sentiment=Sentiment.Negative;



        const actionContext=new ActionContextDTO(contextEmotionMatrix,sentiment,tags);
        const comment = commentFactory.create(caseSlug,actionContext);
        return comment;

    }

}