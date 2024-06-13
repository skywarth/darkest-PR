import { Context } from "probot";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {RepositoryConfig} from "../Config/RepositoryConfig.js";
import {
    BotConfigEventSubsHandler,
    RepositoryConfigEventSubsHandler
} from "../Config/EventSubscriptionHandler/EventSubscriptionHandler.js";


export default abstract class ActionHandlerStrategy<T extends EmitterWebhookEventName> {

    protected abstract execute(ghContext: Context<T>): Promise<void>;

    public async handle(ghContext: Context<T>): Promise<void> {


        await RepositoryConfig.initialize(ghContext as any as Context);//Initializing the RepositoryConfig //TODO: move to a proper place

        const botConfigSubsHandler=new BotConfigEventSubsHandler();
        const repoConfigSubsHandler=new RepositoryConfigEventSubsHandler();
        botConfigSubsHandler.nextHandler=repoConfigSubsHandler;


        //console.log(ghContext);
        if (!botConfigSubsHandler.handle(this.getEventName()) || ghContext.isBot) { // Replace with condition for this bot only
            return;
        }
        await this.execute(ghContext);
    }

    protected abstract getEventName():EmitterWebhookEventName;

}