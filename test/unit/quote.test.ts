import {beforeEach, describe, expect, test} from "vitest";
import {Quote, QuoteCollection} from "../../src/Quote/Quote";
import {Sentiment} from "../../src/enums/Sentiment";
import {Emotion} from "../../src/enums/Emotion";

describe.concurrent("Quote Tests", () => {

    describe("Quote",() => {
        describe("hasTags()",() => {

            describe("Quote has tags",() => {
                let quote:Quote;

                beforeEach(() => {
                    quote=quote = new Quote('foo','bar',Sentiment.Neutral, [{emotion:Emotion.Joy.Ecstasy,temperature:4},{emotion:Emotion.Interest.Trust,temperature:3}],['some','tags']);
                });

                test("Doesn't contain any of the tags", async () => {
                    expect(quote.hasTags(['x'])).toBe(false);
                });

                test("Contains only one of the tags", async () => {
                    expect(quote.hasTags(['some'])).toBe(true);
                });

                test("Contains all of the tags", async () => {
                    expect(quote.hasTags(['some','tags'])).toBe(true);
                });

                test("Empty tags parameter", async () => {
                    expect(quote.hasTags([])).toBe(true);
                });
            });

            describe("Quote doesn't have tags",() => {
                let quote:Quote;

                beforeEach(() => {
                    quote=quote = new Quote('foo','bar',Sentiment.Neutral, [{emotion:Emotion.Joy.Ecstasy,temperature:4},{emotion:Emotion.Interest.Trust,temperature:3}],[]);
                });

                test("Doesn't contain any tags", async () => {
                    expect(quote.hasTags(['some','tags'])).toBe(false);
                });
            });

        });

        describe("hasEmotions()",() => {

            let quote:Quote;

            beforeEach(() => {
                quote = new Quote('foo','bar',Sentiment.Neutral, [{emotion:Emotion.Fear.Terror,temperature:4},{emotion:Emotion.Anger.Wrath,temperature:3},{emotion:Emotion.Surprise.Wonder,temperature:5}],[]);
            });

            test("Partial intersection", async () => {
                expect(quote.hasEmotions([Emotion.Joy.Ecstasy,Emotion.Fear.Terror])).toBe(false);
            });

            test("Contains all the emotions", async () => {
                expect(quote.hasEmotions([Emotion.Fear.Terror,Emotion.Anger.Wrath])).toBe(true);
            });

            test("Empty emotions parameter", async () => {
                expect(quote.hasEmotions([])).toBe(true);
            });

        });

        describe("getEmotionScore()",() => {

            let quote:Quote;

            beforeEach(() => {
                quote = new Quote('foo','bar',Sentiment.Neutral,
                    [
                        {emotion:Emotion.Fear.Terror,temperature:4},
                        {emotion:Emotion.Anger.Wrath,temperature:3},
                        {emotion:Emotion.Surprise.Wonder,temperature:5},
                        {emotion:Emotion.Anger.Irritation,temperature:2},
                        {emotion:Emotion.Fear.Anxiety,temperature:1},
                        {emotion:Emotion.Disgust.Hatred,temperature:5},
                    ],
                    []);
            });

            test("Expected score matches the calculation, partial intersection", async () => {
                const expected:number=19;
                const score=quote.getEmotionScore([
                    {emotion:Emotion.Fear.Anxiety,temperature:1},
                    {emotion:Emotion.Anger.Irritation,temperature:4},
                    {emotion:Emotion.Disgust.Hatred,temperature:2},
                ]);
                expect(score).toBe(expected);
            });

            test("Expected score matches the calculation, full match", async () => {
                const expected:number=63;
                const score=quote.getEmotionScore([
                    {emotion:Emotion.Fear.Terror,temperature:2},
                    {emotion:Emotion.Anger.Wrath,temperature:1},
                    {emotion:Emotion.Surprise.Wonder,temperature:4},
                    {emotion:Emotion.Anger.Irritation,temperature:3},
                    {emotion:Emotion.Fear.Anxiety,temperature:1},
                    {emotion:Emotion.Disgust.Hatred,temperature:5},
                ]);
                expect(score).toBe(expected);
            });

            test("Non-existing emotions doesn't affect score", async () => {
                const expected:number=8;
                const score=quote.getEmotionScore([
                    {emotion:Emotion.Fear.Terror,temperature:2},
                    {emotion:Emotion.Fear.Panic,temperature:3},
                ]);
                expect(score).toBe(expected);
            });

            test("Default score is 0 when none match", async () => {
                const expected:number=0;
                const score=quote.getEmotionScore([
                    {emotion:Emotion.Fear.Panic,temperature:3},
                    {emotion:Emotion.Shame.Embarrassment,temperature:5},
                ]);
                expect(score).toBe(expected);
            });



        });
    });


    describe("QuoteCollection",()=>{

        const quoteArray:Array<Quote>=[
            new Quote('Lorem ipsum dolor sit amet, consectetur adipiscing elit.','foo',Sentiment.Neutral,[{emotion:Emotion.Joy.Happiness,temperature:4}],[]),
            new Quote('Maecenas nunc mauris, interdum ut dapibus vitae, sollicitudin in arcu.','bar',Sentiment.Negative,[{emotion:Emotion.Sadness.Grief,temperature:2},{emotion:Emotion.Disgust.Contempt,temperature:2}],['brooding','dark']),
            new Quote('Suspendisse ut porttitor diam. Integer varius elit vitae condimentum iaculis.','baz',Sentiment.Positive,[{emotion:Emotion.Joy.Relief,temperature:3},{emotion:Emotion.Interest.Kindness,temperature:5}],['hopeful']),
        ];

        let quoteCollection:QuoteCollection;

        beforeEach(() => {
            quoteCollection=new QuoteCollection(quoteArray);
        });

        test("data getter returns the original data", async() => {
            expect(quoteCollection.data).toBeInstanceOf(Array<Quote>);
            expect(quoteCollection.data).toMatchObject(quoteArray);
        });

        describe("find()",() => {
            test("Returns the matching quote by slug when it exists", async() => {
                const slug='foo';
                const result=quoteCollection.find(slug);
                expect(result).toBeInstanceOf(Quote);
                expect(result?.slug).toBe(slug);
            });

            test("Returns undefined when no quote is found", async() => {
                const slug='invalid';
                const result=quoteCollection.find(slug);
                expect(result).not.toBeInstanceOf(Quote);
                expect(result).toBe(undefined);
            });

        });

        describe("clone()",() => {
            test("Returns a cloned object", async() => {
                const cloned=quoteCollection.clone();
                const alteredClone=cloned.clone().filterBySentiment(Sentiment.Neutral);
                expect(cloned).toBeInstanceOf(QuoteCollection);
                expect(cloned).toMatchObject(quoteCollection);
                expect(cloned).toStrictEqual(quoteCollection);
                expect(cloned.data).toStrictEqual(quoteCollection.data);
                expect(cloned).not.toBe(quoteCollection);

                expect(alteredClone.data).not.toStrictEqual(cloned.data);
            });
        });
    });
});