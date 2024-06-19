import {describe, expect, test} from "vitest";
import {QuoteCollection} from "../../../src/Quote/Quote";
import QuoteRepository from "../../../src/Quote/QuoteRepository";
import {Sentiment} from "../../../src/enums/Sentiment";

describe.concurrent("QuoteRepository Tests", () => {

    describe("index()",() => {
        test("Returns QuoteCollection", async() => {
            const quoteRepository=QuoteRepository.getInstance();
            expect(quoteRepository.index()).toBeInstanceOf(QuoteCollection);
        });

        test("Mutating response doesn't affect the original data", async() => {
            const quoteRepository=QuoteRepository.getInstance();
            const quoteCollection=quoteRepository.index();
            quoteCollection.filterBySentiment(Sentiment.Positive);
            expect(quoteCollection.data.length).not.toBe(quoteRepository.index().data.length);
        });
    });

    describe("find()",() => {
        test("Returns the Quote with the correct slug", async() => {
            const quoteRepository=QuoteRepository.getInstance();
            const firstQuoteSlug=quoteRepository.index().first()?.slug??'';
            expect(quoteRepository.find(firstQuoteSlug)?.slug).toBe(firstQuoteSlug);
        });

        test("Returns undefined/null when not found", async() => {
            const quoteRepository=QuoteRepository.getInstance();
            expect(quoteRepository.find('some-really-out-of-ordinary-slug-that-doesnt-exist')?.slug).toBe(undefined);
        });
    });


});