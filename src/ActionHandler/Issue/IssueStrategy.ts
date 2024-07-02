import ActionHandlerStrategy from "../ActionHandlerStrategy.js";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {CommentFactory} from "../../Comment/CommentFactory.js";
import Comment from "../../Comment/Comment.js";




export default abstract class IssueStrategy<T extends EmitterWebhookEventName> extends ActionHandlerStrategy<T> {
    protected async execute(commentFactory:CommentFactory): Promise<Comment|null> {

        return this.executeIssueStrategy(commentFactory);

    }

    protected abstract executeIssueStrategy(commentFactory:CommentFactory): Promise<Comment|null>;
}