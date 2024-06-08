import PullRequestStrategy, {OctokitResponsePullRequest} from "./PullRequestStrategy.js";
import {Context} from "probot";
import {Emotion} from "../../enums/Emotion.js";
import {Sentiment} from "../../enums/Sentiment.js";
import {Quote} from "../../Quote/Quote.js";
import {QuoteFacade} from "../../Quote/QuoteFacade.js";
import Comment from "../../Comment.js";
import {ActionContextDTO} from "../../DTO/ActionContextDTO.js";


export default class PullRequestReviewerAdded extends PullRequestStrategy<'pull_request.review_requested'>{


    protected async executePrStrategy(ghContext: Context<'pull_request.review_requested'>,_previousPRs:Array<OctokitResponsePullRequest>): Promise<void> {


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
        let caseSlug: string='pull-request.reviewer-added';
        let sentiment :Sentiment=Sentiment.Neutral;



        const actionContext=new ActionContextDTO(contextEmotionMatrix,sentiment,tags);
        const quote: Quote|undefined = QuoteFacade.getInstance().getQuote(actionContext);
        if(quote){
            const comment: Comment = new Comment(quote, caseSlug, actionContext)

            const issueComment = ghContext.issue(comment.getObject());
            ghContext.octokit.issues.createComment(issueComment);
        }

        return;









    }

}