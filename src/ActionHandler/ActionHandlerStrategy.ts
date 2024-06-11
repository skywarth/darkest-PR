import { Context } from "probot";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {RepositoryConfig} from "../Config/RepositoryConfig.js";


export default abstract class ActionHandlerStrategy<T extends EmitterWebhookEventName> {

    protected abstract execute(ghContext: Context<T>): Promise<void>;

    public async handle(ghContext: Context<T>): Promise<void> {

        await RepositoryConfig.initialize(ghContext as any as Context);//Initializing the RepositoryConfig //TODO: move to a proper place
        //console.log(ghContext);
        if (ghContext.isBot) { // Replace with condition for this bot only
            return;
        }
        this.execute(ghContext);
    }
}