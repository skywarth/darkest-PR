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
import {ActionContextDTO, actionContextFromPartial} from "../../DTO/ActionContextDTO.js";








export default class IssueCommentCreatedStrategy extends IssueCommentStrategy<'issue_comment.created'>{

    //@ts-ignore
    protected async executeIssueCommentStrategy(ghContext: Context<'issue_comment.created'>): Promise<void> {


        let tags: Array<string>=['comment','create','new','narrative','narrate','criticism','collaborate','discussion','whisper','conspiracy','mention','note','opinion','remark','summon'];
        let contextEmotionMetrics: Array<Emotion.EmotionMetric>=[];
        let caseSlug: string;
        let sentiment :Sentiment|null=null;

        const bodyHTML = sanitizeHtml((await marked(ghContext.payload.comment.body)));


        const bodyDOM=cheerio.load(bodyHTML);
        console.log(bodyDOM.text());
        let malformedInputPackageDetected:boolean=false;
        let inputPackageDetected:boolean;
        const matchingJsonString=bodyDOM('code').toArray().map(x=>cheerio.load(x).text()).find(function (codeText){
            try {
                inputPackageDetected=codeText.includes('Darkest-PR-input-package');
                const data = JSON.parse(codeText);
                return data.identifier==="Darkest-PR-input-package";
                //return jsonData.identifier === "Darkest-PR-input-package";
            } catch (error) {
                malformedInputPackageDetected=inputPackageDetected;
                return false;
            }
        });
        const dataRaw:Partial<ActionContextDTO>=JSON.parse(matchingJsonString??'{}');

        const actionContext:ActionContextDTO=matchingJsonString? actionContextFromPartial(dataRaw): {emotionMetrics:contextEmotionMetrics,sentiment:sentiment,tags:tags};

        if(matchingJsonString){
            caseSlug='issue-comment.created.bot-tagged.param-provided';
        }else{
            caseSlug='issue-comment.created.bot-tagged.no-param';
        }

        console.log(actionContext);
        const quote: Quote = QuoteFacade.getInstance().getQuote(actionContext);
        let warnings:Array<string>=[]
        if(malformedInputPackageDetected){
            //TODO: move warning messages to appropriate place, maybe exception class?
            warnings=[...warnings,'Malformed Input Package Detected! Please format your input package according to the README specification, and check your JSON format for syntax.']
        }
        const comment: Comment = new Comment(quote, caseSlug, actionContext,warnings)

        const issueComment = ghContext.issue(comment.getObject());
        console.log(issueComment);
        ghContext.octokit.issues.createComment(issueComment);
        return;









    }

}