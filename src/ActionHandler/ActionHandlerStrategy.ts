import { Context } from "probot";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";

export default abstract class ActionHandlerStrategy<T extends EmitterWebhookEventName> {

    protected abstract execute(ghContext: Context<T>): void;

    public async handle(ghContext: Context<T>): Promise<void> {
        //console.log(ghContext);
        if (ghContext.isBot) { // Replace with condition for this bot only
            return;
        }
        this.execute(ghContext);
    }
}