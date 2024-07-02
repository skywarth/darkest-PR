import {Emotion} from "../../enums/Emotion.js";
import {Sentiment} from "../../enums/Sentiment.js";
import {ActionContextDTO} from "../../DTO/ActionContextDTO.js";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {CommentFactory} from "../../Comment/CommentFactory.js";
import Comment from "../../Comment/Comment.js";
import {CaseSlugs} from "../../enums/CaseSlug.js";
import IssueStrategy from "./IssueStrategy.js";


export default class IssueAssigneeAddedStrategy extends IssueStrategy<'issues.assigned'>{


    protected getEventName(): EmitterWebhookEventName {
        return "issues.assigned";
    }


    protected async executeIssueStrategy(commentFactory:CommentFactory): Promise<Comment|null> {


        let tags: Array<string>=['assignment','save','help','team','support','backup','reinforce','reinforcement','aid','band','league','join','accompany','assemble','associate','enlist','guide','lead','pair','together','company','team up','stand together','unite','ally','suggest','request','plea','call','duty','demand','appeal','summon','invoke','invitation','invite','prayer','seek','hero','champion','evaluation','new','arrive','arrival','fresh','the one','savior','visitor','task','mission','goal'];
        let contextEmotionMatrix: Emotion.EmotionMatrix=[
            {emotion:Emotion.Fear.Fright,temperature:2},
            {emotion:Emotion.Fear.Anxiety,temperature:3},
            {emotion:Emotion.Joy.Relief,temperature:4},
            {emotion:Emotion.Joy.Thrill,temperature:2},
            {emotion:Emotion.Surprise.Amazement,temperature:2},
            {emotion:Emotion.Surprise.Wonder,temperature:3},
            {emotion:Emotion.Interest.Kindness,temperature:3},
        ];

        let caseSlug: CaseSlugs.Types=CaseSlugs.Issue.Assignee.Added;
        let sentiment :Sentiment=Sentiment.Positive;



        const actionContext=new ActionContextDTO(contextEmotionMatrix,sentiment,tags);
        const comment = commentFactory.create(caseSlug,actionContext);
        return comment;

    }

}