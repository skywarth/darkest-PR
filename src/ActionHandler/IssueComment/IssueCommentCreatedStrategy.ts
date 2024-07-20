import {Emotion} from "../../enums/Emotion.js";
import {Sentiment} from "../../enums/Sentiment.js";
import Comment, {ReplyContext} from "../../Comment/Comment.js";
import IssueCommentStrategy from "./IssueCommentStrategy.js";
import * as cheerio from 'cheerio';
import {marked} from "marked";
import sanitizeHtml from 'sanitize-html';
import {ActionContextDTO} from "../../DTO/ActionContextDTO.js";
import {BotConfig} from "../../Config/BotConfig.js";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {CommentFactory} from "../../Comment/CommentFactory.js";
import {CaseSlugs} from "../../enums/CaseSlug.js";








export default class IssueCommentCreatedStrategy extends IssueCommentStrategy<'issue_comment.created'>{


    protected getEventName(): EmitterWebhookEventName {
        return "issue_comment.created";
    }

    protected async executeIssueCommentStrategy(commentFactory:CommentFactory): Promise<Comment|null> {

        let tags: Array<string>=['comment','create','new','narrative','narrate','criticism','collaborate','discussion','whisper','conspiracy','mention','note','opinion','remark','summon'];
        let contextEmotionMatrix: Emotion.EmotionMatrix=[];
        let caseSlug: CaseSlugs.Types;
        let sentiment :Sentiment|null=null;

        let warnings:Array<string>=[]

        const replyContext:ReplyContext= {
            replyToUsername:this.ghContext.payload.sender.login??'',
            replyingToMessage:this.ghContext.payload.comment.body
        };
        const bodyHTML = sanitizeHtml((await marked(this.ghContext.payload.comment.body)));

        const bodyDOM=cheerio.load(bodyHTML);
        const dataPackageIdentifier=`${BotConfig.getInstance().bot_name}-input-package`.toLowerCase();
        const matchingJsonString=bodyDOM('code').toArray().map(x=>cheerio.load(x).text()).find(function (codeText){
            if(codeText.toLowerCase().includes(dataPackageIdentifier)){
                try{
                    const data = JSON.parse(codeText);
                    return data.identifier.toLowerCase()===dataPackageIdentifier;
                }catch (error){
                    warnings.push('Malformed Input Package Detected! Please format your input package according to the README specification, and check your JSON format for syntax.');
                    return false;
                }
            }else{
                return false;
            }
        });

        const defaultActionContext:ActionContextDTO=new ActionContextDTO(contextEmotionMatrix,sentiment,tags);
        let actionContext:ActionContextDTO;

        if(matchingJsonString){
            caseSlug=CaseSlugs.Issue.Comment.Created.BotTagged.ParametersProvided;
            try{
                const dataRaw:Partial<ActionContextDTO>=JSON.parse(matchingJsonString??'{}');
                actionContext=new ActionContextDTO(dataRaw.emotionMatrix,dataRaw.sentiment,dataRaw.tags,dataRaw.quoteSlugs)
            }catch (exception:any){
                actionContext=defaultActionContext;
                warnings.push('Malformed Input Package Detected! Please format your input package according to the README specification, and check your JSON format for syntax.');
            }
        }else{
            caseSlug=CaseSlugs.Issue.Comment.Created.BotTagged.ParametersNotProvided;
            actionContext=defaultActionContext;
        }

        const comment = commentFactory.create(caseSlug,actionContext,replyContext,warnings);
        return comment;

    }

}