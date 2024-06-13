import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {BotConfig} from "../BotConfig.js";
import {RepositoryConfig} from "../RepositoryConfig.js";

export interface EventSubscriptionHandler {

    handle(eventSlug:EmitterWebhookEventName):boolean;
    set nextHandler(next:EventSubscriptionHandler);
    get nextHandler():EventSubscriptionHandler|undefined;
}

abstract class BaseEventSubscriptionHandler implements EventSubscriptionHandler{

    #nextHandler:EventSubscriptionHandler|undefined;


    constructor(nextHandler: EventSubscriptionHandler|undefined=undefined) {
        this.#nextHandler = nextHandler;
    }

    get nextHandler(): EventSubscriptionHandler|undefined {
        return this.#nextHandler;
    }

    set nextHandler(next: EventSubscriptionHandler){
        this.#nextHandler=next;
    }

    handle(eventSlug: EmitterWebhookEventName): boolean {
        const result=this.execute(eventSlug);
        if(result && this.nextHandler){
            return this.nextHandler.handle(eventSlug);
        }else{
            return result;
        }
    }

    protected abstract execute(eventSlug:EmitterWebhookEventName):boolean;


}

export class BotConfigEventSubsHandler extends BaseEventSubscriptionHandler{

    protected execute(eventSlug: EmitterWebhookEventName): boolean {
        return BotConfig.getInstance().isEventSubscriptionEnabled(eventSlug);
    }
}

export class RepositoryConfigEventSubsHandler extends BaseEventSubscriptionHandler{

    protected execute(eventSlug: EmitterWebhookEventName): boolean {
        return RepositoryConfig.getInstance().isEventSubscriptionEnabled(eventSlug);
    }
}