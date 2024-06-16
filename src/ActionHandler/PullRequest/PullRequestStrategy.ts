import ActionHandlerStrategy from "../ActionHandlerStrategy.js";
import { Context } from "probot";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import { components } from "@octokit/openapi-types";
import {CommentFactory} from "../../Comment/CommentFactory.js";
import Comment from "../../Comment/Comment";


export type OctokitResponsePullRequest = components["schemas"]["pull-request"];

export default abstract class PullRequestStrategy<T extends EmitterWebhookEventName> extends ActionHandlerStrategy<T> {
    protected async execute(commentFactory:CommentFactory): Promise<Comment|null> {

        const payload = this.ghContext.payload as Context<'pull_request'>['payload'];
        //@ts-ignore
        const previousPRs: Array<OctokitResponsePullRequest> = (await this.ghContext.octokit.pulls.list({
            repo: payload.repository.name,
            sort:'updated',
            direction:'desc',
            owner: payload.repository.owner.login,
            state: 'all',
            head: `${payload.repository.owner.login}:${payload.pull_request.head.ref}`
        })).data.filter(x=>x.id!==payload.pull_request.id);
        return this.executePrStrategy(commentFactory,previousPRs);
    }

    protected abstract executePrStrategy(commentFactory:CommentFactory,previousPRs:Array<OctokitResponsePullRequest>): Promise<Comment|null>;
}