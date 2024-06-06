import {Context} from "probot";
import {Emotion} from "../../enums/Emotion.js";
import {Sentiment} from "../../enums/Sentiment.js";
import {Quote} from "../../Quote.js";
import {QuoteFacade} from "../../QuoteFacade.js";
import Comment from "../../Comment.js";
import IssueCommentStrategy from "./IssueCommentStrategy.js";
import * as cheerio from 'cheerio';
import {marked} from "marked";
import sanitizeHtml from 'sanitize-html';








export default class IssueCommentCreatedStrategy extends IssueCommentStrategy<'issue_comment.created'>{

    //@ts-ignore
    protected async executeIssueCommentStrategy(ghContext: Context<'issue_comment.created'>): Promise<void> {


        let tags: Array<string>=['comment','create','new','narrative','narrate','criticism','collaborate','discussion','whisper','conspiracy','mention','note','opinion','remark','summon'];
        let contextEmotionMetrics: Array<Emotion.EmotionMetric>=[];
        let caseSlug: string;
        let sentiment :Sentiment|null=null;



        caseSlug='issue-comment.created.bot-tagged.no-param';
        const bodyHTML = sanitizeHtml((await marked(ghContext.payload.comment.body)));


        const bodyDOM=cheerio.load(bodyHTML);
        console.log(bodyDOM.text());
        const dataRaw=bodyDOM('code').toArray().map(x=>cheerio.load(x).text()).find(function (codeText){
            try {
                const data = JSON.parse(codeText);
                return data.identifier==="Darkest-PR-input-package";
                //return jsonData.identifier === "Darkest-PR-input-package";
            } catch (error) {
                return false;
            }
        });
        const data=dataRaw?JSON.parse(dataRaw):null;
        //TODO: type for data. Wait, we can actually use that type as DTO as well can't we?
        console.log(data);
        return;

        const quote: Quote = QuoteFacade.getInstance().getQuote(contextEmotionMetrics, sentiment, tags);
        const comment: Comment = new Comment(quote, caseSlug, contextEmotionMetrics)

        const issueComment = ghContext.issue(comment.getObject());
        console.log(issueComment);
        ghContext.octokit.issues.createComment(issueComment);
        return;









    }

}