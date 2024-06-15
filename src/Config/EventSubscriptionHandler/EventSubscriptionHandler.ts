import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {HasEventSubscriptions} from "../HasEventSubscriptions.js";



export class EventSubscriptionHandler{

    #current:HasEventSubscriptions;
    #nextHandler:EventSubscriptionHandler|undefined;


    constructor(curr:HasEventSubscriptions,nextHandler: EventSubscriptionHandler|undefined=undefined) {
        this.#current=curr;
        this.#nextHandler = nextHandler;
    }


    get current(): HasEventSubscriptions {
        return this.#current;
    }

    get nextHandler(): EventSubscriptionHandler|undefined {
        return this.#nextHandler;
    }

    set nextHandler(next: EventSubscriptionHandler){
        this.#nextHandler=next;
    }

    handle(eventSlug: EmitterWebhookEventName): boolean {
        const result=this.current.isEventSubscriptionEnabled(eventSlug);
        if(result && this.nextHandler){
            return this.nextHandler.handle(eventSlug);
        }else{
            return result;
        }
    }

}
