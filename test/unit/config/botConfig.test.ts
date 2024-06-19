import {describe, expect, vi, test} from 'vitest';
import {BotConfig} from "../../../src/Config/BotConfig";
import {EventSubscriptionsDTO} from "../../../src/DTO/EventSubscriptionsDTO";


describe.concurrent('BotConfig', () => {


    const mockEventSubscriptions:EventSubscriptionsDTO={
        'pull_request_review.submitted':true,
        'pull_request.closed':false,
        'pull_request.review_request_removed':true,
        'issue_comment.created':false,
    }

    const mockConfig={
        botName: {
            env:'Darkest-PR-TESTING',
            resolved:'Darkest-PR-TESTING'
        },
        active:{
            env:'true',
            resolved:true
        },
        eventSubscriptions:{
            env:JSON.stringify(mockEventSubscriptions),
            resolved:mockEventSubscriptions
        },
    }

    vi.stubEnv('DARKEST_PR_BOT_NAME', mockConfig.botName.env);
    vi.stubEnv('DARKEST_PR_ACTIVE', mockConfig.active.env);
    vi.stubEnv('DARKEST_PR_EVENT_SUBSCRIPTIONS', mockConfig.eventSubscriptions.env);

    test('Should return the correct bot name', () => {
        const config = BotConfig.getInstance();
        expect(config.bot_name).toBe(mockConfig.botName.resolved);
    });

    test('Should return the correct active status', () => {
        const config = BotConfig.getInstance();
        expect(config.active).toBe(mockConfig.active.resolved);
    });

    describe("Event Subscriptions",() => {
        test('Should correctly parse and return EventSubscriptions', () => {
            const config = BotConfig.getInstance();
            expect(config.event_subscriptions).toStrictEqual(mockConfig.eventSubscriptions.resolved);
        });

        test("Should get the corresponding event subscription's value", () => {
            const config = BotConfig.getInstance();
            const eventSlug='pull_request.closed';
            expect(config.isEventSubscriptionEnabled(eventSlug)).toStrictEqual(mockEventSubscriptions[eventSlug]);
        });

        test("Should get the default event subscription status when event subscription is not defined", () => {
            const config = BotConfig.getInstance();
            const eventSlug='pull_request.review_requested';
            expect(config.isEventSubscriptionEnabled(eventSlug)).toStrictEqual(config.defaultEventSubscription);
        });
    });


});
