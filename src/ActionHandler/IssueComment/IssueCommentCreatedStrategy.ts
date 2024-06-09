import {Context} from "probot";
import {Emotion} from "../../enums/Emotion.js";
import {Sentiment} from "../../enums/Sentiment.js";
import {Quote} from "../../Quote/Quote.js";
import {QuoteFacade} from "../../Quote/QuoteFacade.js";
import Comment, {ReplyContext} from "../../Comment.js";
import IssueCommentStrategy from "./IssueCommentStrategy.js";
import * as cheerio from 'cheerio';
import {marked} from "marked";
import sanitizeHtml from 'sanitize-html';
import {ActionContextDTO} from "../../DTO/ActionContextDTO.js";
import {Config} from "../../Config.js";








export default class IssueCommentCreatedStrategy extends IssueCommentStrategy<'issue_comment.created'>{

    protected async executeIssueCommentStrategy(ghContext: Context<'issue_comment.created'>): Promise<void> {

        let tags: Array<string>=['comment','create','new','narrative','narrate','criticism','collaborate','discussion','whisper','conspiracy','mention','note','opinion','remark','summon'];
        let contextEmotionMatrix: Emotion.EmotionMatrix=[];
        let caseSlug: string;
        let sentiment :Sentiment|null=null;

        let warnings:Array<string>=[]

        const replyContext:ReplyContext= {
            replyToUsername:ghContext.payload.sender.login??'',
            replyingToMessage:ghContext.payload.comment.body
        };
        const bodyHTML = sanitizeHtml((await marked(ghContext.payload.comment.body)));

        const bodyDOM=cheerio.load(bodyHTML);
        console.log(bodyDOM.text());
        //let malformedInputPackageDetected:boolean=false;
        //let inputPackageDetected:boolean;
        const matchingJsonString=bodyDOM('code').toArray().map(x=>cheerio.load(x).text()).find(function (codeText){
            try {
                //inputPackageDetected=codeText.includes('Darkest-PR-input-package');
                const data = JSON.parse(codeText);
                return data.identifier===`${Config.bot_name}-input-package`;
                //return jsonData.identifier === "Darkest-PR-input-package";
            } catch (error) {
                //TODO: move warning messages to appropriate place, maybe exception class?
                //malformedInputPackageDetected=inputPackageDetected;//TODO: remove, unnecessary?
                warnings.push('Malformed Input Package Detected! Please format your input package according to the README specification, and check your JSON format for syntax.');
                return false;
            }
        });

        const defaultActionContext:ActionContextDTO=new ActionContextDTO(contextEmotionMatrix,sentiment,tags);
        let actionContext:ActionContextDTO;

        if(matchingJsonString){
            try{
                const dataRaw:Partial<ActionContextDTO>=JSON.parse(matchingJsonString??'{}');
                actionContext=new ActionContextDTO(dataRaw.emotionMatrix,dataRaw.sentiment,dataRaw.tags,dataRaw.quoteSlugs)
            }catch (exception:any){
                actionContext=defaultActionContext;
                warnings.push(exception.message)
            }
        }else{
            actionContext=defaultActionContext;
        }





        if(matchingJsonString){
            caseSlug='issue-comment.created.bot-tagged.param-provided';
        }else{
            caseSlug='issue-comment.created.bot-tagged.no-param';
        }

        console.log(actionContext);
        const quote: Quote|undefined = QuoteFacade.getInstance().getQuote(actionContext);


        if(quote){

            const comment: Comment = new Comment(quote, caseSlug, actionContext,replyContext,warnings)

            const issueComment = ghContext.issue(comment.getObject());
            await ghContext.octokit.issues.createComment(issueComment);
        }

        return;









    }

}