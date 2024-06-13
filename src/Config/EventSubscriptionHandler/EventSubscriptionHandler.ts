import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {BotConfig} from "../BotConfig";

export interface EventSubscriptionHandler {

    handle(eventSlug:EmitterWebhookEventName):boolean;
    set nextHandler(next:EventSubscriptionHandler);
}

export abstract class BaseEventSubscriptionHandler implements EventSubscriptionHandler{

    #nextHandler:EventSubscriptionHandler;


    constructor(nextHandler: EventSubscriptionHandler) {
        this.#nextHandler = nextHandler;
    }

    get nextHandler(): EventSubscriptionHandler {
        return this.#nextHandler;
    }

    set nextHandler(next: EventSubscriptionHandler){
        this.#nextHandler=next;
    }

    handle(eventSlug: EmitterWebhookEventName): boolean {
        if(this.execute(eventSlug)){
            return this.nextHandler.handle(eventSlug);
        }
        return false;
    }

    abstract execute(eventSlug:EmitterWebhookEventName):boolean;


}

class BotConfigEventSubsHandler extends BaseEventSubscriptionHandler{

    execute(eventSlug: EmitterWebhookEventName): boolean {
        return BotConfig.getInstance().isEventSubscriptionEnabled(eventSlug);
    }
}

class RepositoryConfigEventSubsHandler extends BaseEventSubscriptionHandler{

    execute(eventSlug: EmitterWebhookEventName): boolean {
        return BotConfig.getInstance().isEventSubscriptionEnabled(eventSlug);
    }
}