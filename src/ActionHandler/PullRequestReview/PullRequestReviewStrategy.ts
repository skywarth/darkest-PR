import ActionHandlerStrategy from "../ActionHandlerStrategy.js";
import { Context } from "probot";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {CommentFactory} from "../../Comment/CommentFactory.js";
import Comment from "../../Comment/Comment";



export default abstract class PullRequestReviewStrategy<T extends EmitterWebhookEventName> extends ActionHandlerStrategy<T> {
    protected async execute(ghContext: Context<T>,commentFactory:CommentFactory): Promise<Comment|null> {

        return this.executePrReviewStrategy(ghContext,commentFactory);
    }

    protected abstract executePrReviewStrategy(ghContext: Context<T>,commentFactory:CommentFactory): Promise<Comment|null>;
}