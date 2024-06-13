import Utils from "../Utils.js";
import {HasEventSubscriptions} from "./HasEventSubscriptions.js";
import {EventSubscriptionsDTO} from "../DTO/EventSubscriptionsDTO.js";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";

export class BotConfig implements HasEventSubscriptions{
    #bot_name:string;
    #active:boolean;
    #event_subscriptions: EventSubscriptionsDTO;



    static #instance:BotConfig;
    private constructor() {
        this.#bot_name=this.envAccessor(process.env.DARKEST_PR_BOT_NAME,'Darkest-PR')
        this.#active=this.envAccessor(process.env.DARKEST_PR_ACTIVE,false,Utils.stringToBoolean);
        this.#event_subscriptions=this.envAccessor(process.env.DARKEST_PR_EVENT_SUBSCRIPTIONS,{},JSON.parse);
    }



    get bot_name(): string {
        return this.#bot_name;
    }

    get active(): boolean {
        return this.#active;
    }

    public static getInstance():BotConfig{
        if (!this.#instance) {
            this.#instance = new this();
        }
        return this.#instance;
    }

    envAccessor(
        env:string|undefined,
        defaultVal:any,
        caster:((env:string)=>typeof defaultVal)=function (env:string):string{
            return env;
        }
    ):typeof defaultVal{
        if(env){
            return caster(env);
        }else{
            return (typeof defaultVal === 'function')?defaultVal():defaultVal;
        }

    }

    get defaultEventSubscription():boolean{
        return true;
    }

    get event_subscriptions(): EventSubscriptionsDTO {
        return this.#event_subscriptions;
    }

    isEventSubscriptionEnabled(event: EmitterWebhookEventName): boolean {
        return this.event_subscriptions[event] ?? true;
    }

}