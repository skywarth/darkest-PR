import PullRequestStrategy, {OctokitResponsePullRequest} from "./PullRequestStrategy.js";
import {Emotion} from "../../enums/Emotion.js";
import {Sentiment} from "../../enums/Sentiment.js";
import {ActionContextDTO} from "../../DTO/ActionContextDTO.js";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {CommentFactory} from "../../Comment/CommentFactory.js";
import Comment from "../../Comment/Comment.js";
import {CaseSlugs} from "../../enums/CaseSlug.js";


export default class PullRequestAssigneeAddedStrategy extends PullRequestStrategy<'pull_request.assigned'>{


    protected getEventName(): EmitterWebhookEventName {
        return "pull_request.assigned";
    }


    protected async executePrStrategy(commentFactory:CommentFactory,_previousPRs:Array<OctokitResponsePullRequest>): Promise<Comment|null> {


        let tags: Array<string>=['assignment','team','support','backup','reinforce','reinforcement','aid','band','league','join','accompany','assemble','associate','enlist','guide','lead','pair','together','company','team up','stand together','unite','ally','suggest','request','plea','call','duty','demand','appeal','summon','invoke','invitation','invite','prayer','seek','hero','champion','evaluation','new','arrive','arrival','fresh','the one','savior','visitor','task','mission','goal'];
        let contextEmotionMatrix: Emotion.EmotionMatrix=[
            {emotion:Emotion.Interest.Trust,temperature:4},
            {emotion:Emotion.Interest.Friendliness,temperature:5},
            {emotion:Emotion.Fear.Fright,temperature:2},
            {emotion:Emotion.Fear.Anxiety,temperature:1},
            {emotion:Emotion.Joy.Relief,temperature:4},
            {emotion:Emotion.Joy.Thrill,temperature:2},
            {emotion:Emotion.Surprise.Amazement,temperature:2},
            {emotion:Emotion.Surprise.Wonder,temperature:3},
        ];

        let caseSlug: CaseSlugs.Types=CaseSlugs.PullRequest.Assignee.Added;
        let sentiment :Sentiment=Sentiment.Positive;



        const actionContext=new ActionContextDTO(contextEmotionMatrix,sentiment,tags);
        const comment = commentFactory.create(caseSlug,actionContext);
        return comment;

    }

}