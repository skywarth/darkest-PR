import ActionHandlerStrategy from "../ActionHandlerStrategy.js";
import { Context } from "probot";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {Config} from "../../Config.js";




export default abstract class IssueCommentStrategy<T extends EmitterWebhookEventName> extends ActionHandlerStrategy<T> {
    protected async execute(ghContext: Context<T>): Promise<void> {

        const payload = ghContext.payload as Context<'issue_comment'>['payload'];

        //Move to IssueCommentCreatedStrategy if the cases expand
        if(payload.comment.body.toLowerCase().includes(`@${Config.bot_name.toLowerCase()}`)){//Checking whether the bot is tagged or not
            return this.executeIssueCommentStrategy(ghContext);
        }

    }

    protected abstract executeIssueCommentStrategy(ghContext: Context<T>): Promise<void>;
}