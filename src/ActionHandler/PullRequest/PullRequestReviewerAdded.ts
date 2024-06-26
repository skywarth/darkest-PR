import PullRequestStrategy, {OctokitResponsePullRequest} from "./PullRequestStrategy.js";
import {Emotion} from "../../enums/Emotion.js";
import {Sentiment} from "../../enums/Sentiment.js";
import {ActionContextDTO} from "../../DTO/ActionContextDTO.js";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {CommentFactory} from "../../Comment/CommentFactory.js";
import Comment from "../../Comment/Comment";
import {CaseSlugs} from "../../enums/CaseSlug.js";


export default class PullRequestReviewerAdded extends PullRequestStrategy<'pull_request.review_requested'>{


    protected getEventName(): EmitterWebhookEventName {
        return "pull_request.review_requested";
    }


    protected async executePrStrategy(commentFactory:CommentFactory,_previousPRs:Array<OctokitResponsePullRequest>): Promise<Comment|null> {


        let tags: Array<string>=['assignment','review','suggest','request','plea','call','duty','demand','appeal','summon','invoke','invitation','invite','prayer','seek','hero','champion','judge','jury','executioner','audit','inspection','assess','assessment','evaluation','judgement','new','arrive','arrival','fresh','the one','savior','visitor','task','mission','goal'];
        let contextEmotionMatrix: Emotion.EmotionMatrix=[
            {emotion:Emotion.Interest.Trust,temperature:3},
            {emotion:Emotion.Interest.Friendliness,temperature:4},
            {emotion:Emotion.Fear.Fright,temperature:2},
            {emotion:Emotion.Fear.Anxiety,temperature:3},
            {emotion:Emotion.Sadness.Loneliness,temperature:1},
            {emotion:Emotion.Surprise.Wonder,temperature:1},
        ];
        //TODO: use direct quoteSlugs
        let caseSlug: CaseSlugs.Types=CaseSlugs.PullRequest.Reviewer.Added;
        let sentiment :Sentiment=Sentiment.Neutral;



        const actionContext=new ActionContextDTO(contextEmotionMatrix,sentiment,tags);
        const comment = commentFactory.create(caseSlug,actionContext);
        return comment;

    }

}