import {Context} from "probot";
/*import {Emotion} from "../../enums/Emotion.js";
import {Sentiment} from "../../enums/Sentiment.js";
import {Quote} from "../../Quote.js";
import {QuoteFacade} from "../../QuoteFacade.js";
import Comment from "../../Comment.js";*/
import IssueCommentStrategy from "./IssueCommentStrategy.js";


export default class IssueCommentCreatedStrategy extends IssueCommentStrategy<'issue_comment.created'>{

    //@ts-ignore
    protected async executeIssueCommentStrategy(ghContext: Context<'issue_comment.created'>): Promise<void> {


        /*let tags: Array<string>=['comment','create','new','narrative','narrate','criticism','collaborate','discussion','whisper','conspiracy','mention','note','opinion','remark'];
        let contextEmotionMetrics: Array<Emotion.EmotionMetric>;
        let caseSlug: string;
        let sentiment :Sentiment;



        const quote: Quote = QuoteFacade.getInstance().getQuote(sentiment, contextEmotionMetrics, tags);
        const comment: Comment = new Comment(quote, caseSlug, contextEmotionMetrics)

        const issueComment = ghContext.issue(comment.getObject());
        console.log(issueComment);
        ghContext.octokit.issues.createComment(issueComment);*/
        return;









    }

}