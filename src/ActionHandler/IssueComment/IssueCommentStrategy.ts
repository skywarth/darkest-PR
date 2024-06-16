import ActionHandlerStrategy from "../ActionHandlerStrategy.js";
import { Context } from "probot";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {BotConfig} from "../../Config/BotConfig.js";
import {CommentFactory} from "../../Comment/CommentFactory.js";
import Comment from "../../Comment/Comment";




export default abstract class IssueCommentStrategy<T extends EmitterWebhookEventName> extends ActionHandlerStrategy<T> {
    protected async execute(commentFactory:CommentFactory): Promise<Comment|null> {

        const payload = this.ghContext.payload as Context<'issue_comment'>['payload'];

        //Move to IssueCommentCreatedStrategy if the cases expand
        if(payload.comment.body.toLowerCase().includes(`@${BotConfig.getInstance().bot_name.toLowerCase()}`)){//Checking whether the bot is tagged or not
            return this.executeIssueCommentStrategy(commentFactory);
        }
        return null;

    }

    protected abstract executeIssueCommentStrategy(commentFactory:CommentFactory): Promise<Comment|null>;
}