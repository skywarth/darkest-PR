import ActionHandlerStrategy from "../ActionHandlerStrategy.js";
import { Context } from "probot";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";

export default abstract class PullRequestStrategy<T extends EmitterWebhookEventName> extends ActionHandlerStrategy<T> {
    protected execute(ghContext: Context<T>): void {
        return this.executePrStrategy(ghContext);
    }

    protected abstract executePrStrategy(ghContext: Context<T>): void;
}