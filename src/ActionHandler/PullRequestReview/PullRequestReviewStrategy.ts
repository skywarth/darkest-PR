import ActionHandlerStrategy from "../ActionHandlerStrategy.js";
import { Context } from "probot";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";



export default abstract class PullRequestReviewStrategy<T extends EmitterWebhookEventName> extends ActionHandlerStrategy<T> {
    protected async execute(ghContext: Context<T>): Promise<void> {

        return this.executePrReviewStrategy(ghContext);
    }

    protected abstract executePrReviewStrategy(ghContext: Context<T>): Promise<void>;
}