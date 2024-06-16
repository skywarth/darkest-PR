import ActionHandlerStrategy from "../ActionHandlerStrategy.js";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {CommentFactory} from "../../Comment/CommentFactory.js";
import Comment from "../../Comment/Comment";



export default abstract class PullRequestReviewStrategy<T extends EmitterWebhookEventName> extends ActionHandlerStrategy<T> {
    protected async execute(commentFactory:CommentFactory): Promise<Comment|null> {

        return this.executePrReviewStrategy(commentFactory);
    }

    protected abstract executePrReviewStrategy(commentFactory:CommentFactory): Promise<Comment|null>;
}