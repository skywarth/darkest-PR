import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";

export type EventSubscriptionsDTO = {
    [key in EmitterWebhookEventName]?: boolean;
};