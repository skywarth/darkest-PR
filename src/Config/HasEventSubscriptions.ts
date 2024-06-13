import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {EventSubscriptionsDTO} from "../DTO/EventSubscriptionsDTO.js";


export interface HasEventSubscriptions{
    isEventSubscriptionEnabled(event: EmitterWebhookEventName): boolean;
    get defaultEventSubscription():boolean;
    get event_subscriptions(): EventSubscriptionsDTO
}