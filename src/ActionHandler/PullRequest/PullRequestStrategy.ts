import ActionHandlerStrategy from "../ActionHandlerStrategy.js";
import { Context } from "probot";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import { components } from "@octokit/openapi-types";
import {CommentFactory} from "../../Comment/CommentFactory.js";
import Comment from "../../Comment/Comment";


export type OctokitResponsePullRequest = components["schemas"]["pull-request"];

export default abstract class PullRequestStrategy<T extends EmitterWebhookEventName> extends ActionHandlerStrategy<T> {
    protected async execute(ghContext: Context<T>,commentFactory:CommentFactory): Promise<Comment|null> {

        const payload = ghContext.payload as Context<'pull_request'>['payload'];
        //@ts-ignore
        const previousPRs: Array<OctokitResponsePullRequest> = (await ghContext.octokit.pulls.list({
            repo: payload.repository.name,
            sort:'updated',
            direction:'desc',
            owner: payload.repository.owner.login,
            state: 'all',
            head: `${payload.repository.owner.login}:${payload.pull_request.head.ref}`
        })).data.filter(x=>x.id!==payload.pull_request.id);
        return this.executePrStrategy(ghContext,commentFactory,previousPRs);
    }

    protected abstract executePrStrategy(ghContext: Context<T>,commentFactory:CommentFactory,previousPRs:Array<OctokitResponsePullRequest>): Promise<Comment|null>;
}