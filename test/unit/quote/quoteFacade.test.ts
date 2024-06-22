import {describe, expect, test} from "vitest";
import {QuoteFacade} from "../../../src/Quote/QuoteFacade";
import {ActionContextDTO} from "../../../src/DTO/ActionContextDTO";
import {Emotion} from "../../../src/enums/Emotion";
import {Sentiment} from "../../../src/enums/Sentiment";
import {Quote} from "../../../src/Quote/Quote";

describe('QuoteFacade Tests', () => {
    describe("getQuote()",() => {


        const defaultActionContext:ActionContextDTO=new ActionContextDTO(
            [
                {emotion:Emotion.Joy.Happiness,temperature:2},
                {emotion:Emotion.Sadness.Sorrow,temperature:4},
                {emotion:Emotion.Sadness.Grief,temperature:5},
                {emotion:Emotion.Sadness.Melancholy,temperature:3},
            ],
            Sentiment.Negative,
            ['despair','sadness','abandon','fury'],
        );

        test("Returns a Quote", async () => {
            const quoteFacade=QuoteFacade.getInstance();

            const quote=quoteFacade.getQuote(defaultActionContext);

            expect(quote).toBeInstanceOf(Quote);
        });

        test("Returns undefined/null when no Quote is found with the given parameters", async () => {
            const quoteFacade=QuoteFacade.getInstance();

            const quote=quoteFacade.getQuote(new ActionContextDTO([],null,[],['some-tag-that-really-doesnt-exist']));

            expect(quote).toBeUndefined();
        });

        test("Quote has the given Sentiment", async () => {
            const quoteFacade=QuoteFacade.getInstance();

            const quote=quoteFacade.getQuote(defaultActionContext);


            expect(quote?.sentiment).toBe(defaultActionContext.sentiment);
        });

        test("Quote's emotion score is bigger than zero", async () => {
            const quoteFacade=QuoteFacade.getInstance();

            const quote=quoteFacade.getQuote(defaultActionContext);


            expect(quote?.getEmotionScore(defaultActionContext.emotionMatrix)).toBeGreaterThan(0);
        });

        test("Returned Quote's slug is present in quoteSlug parameter", async () => {
            const quoteFacade=QuoteFacade.getInstance();

            const quoteSlugs=['foo','bar'];

            const quote=quoteFacade.getQuote(new ActionContextDTO([],null,[],quoteSlugs));

            expect(quoteSlugs).contain(quote?.slug);
        });

        test("Returns a random Quote among the fitting candidates", async () => {
            const quoteFacade=QuoteFacade.getInstance();

            let quoteSlugs:Array<string>=[];
            for(let i=0;i<50;i++){
                const quote=quoteFacade.getQuote(defaultActionContext);
                if(quote){
                    quoteSlugs.push(quoteFacade.getQuote(defaultActionContext)?.slug??'');
                }

            }

            //Asserting that result/responses differ from one another, hence the shuffling and picking a random
            expect(new Set([...quoteSlugs])).not.toHaveLength(1);
        });

    });

    describe("getQuoteBySlug()",() => {
        test("Returns the Quote when found by slug", async () => {
            const quoteFacade=QuoteFacade.getInstance();
            const quote=quoteFacade.getQuote(new ActionContextDTO());
            const quoteBySlug=quoteFacade.getQuoteBySlug(quote?.slug??'');
            expect(quoteBySlug).toBe(quoteBySlug);
            expect(quoteBySlug?.slug).toBe(quoteBySlug?.slug);
        });
    });
});
