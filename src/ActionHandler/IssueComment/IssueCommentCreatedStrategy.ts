import {Context} from "probot";
import {Emotion} from "../../enums/Emotion.js";
import {Sentiment} from "../../enums/Sentiment.js";
import {ReplyContext} from "../../Comment/Comment.js";
import IssueCommentStrategy from "./IssueCommentStrategy.js";
import * as cheerio from 'cheerio';
import {marked} from "marked";
import sanitizeHtml from 'sanitize-html';
import {ActionContextDTO} from "../../DTO/ActionContextDTO.js";
import {BotConfig} from "../../Config/BotConfig.js";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {CommentFactory} from "../../Comment/CommentFactory.js";








export default class IssueCommentCreatedStrategy extends IssueCommentStrategy<'issue_comment.created'>{


    protected getEventName(): EmitterWebhookEventName {
        return "issue_comment.created";
    }

    protected async executeIssueCommentStrategy(ghContext: Context<'issue_comment.created'>,commentFactory:CommentFactory): Promise<void> {

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
                return data.identifier.toLowerCase()===`${BotConfig.getInstance().bot_name}-input-package`.toLowerCase();
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
        const comment = commentFactory.create(caseSlug,actionContext,replyContext,warnings);
        if(comment){
            const issueComment = ghContext.issue(comment.getObject());
            ghContext.octokit.issues.createComment(issueComment);
        }

        return;









    }

}