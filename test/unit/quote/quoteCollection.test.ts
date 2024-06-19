import {describe, expect, test} from "vitest";
import {Quote, QuoteCollection} from "../../../src/Quote/Quote";
import {Sentiment} from "../../../src/enums/Sentiment";
import {Emotion} from "../../../src/enums/Emotion";

describe.concurrent("QuoteCollection Tests", () => {
    describe("QuoteCollection",()=>{

        const quoteArray:Array<Quote>=[
            new Quote('Lorem ipsum dolor sit amet, consectetur adipiscing elit.','foo',Sentiment.Neutral,[{emotion:Emotion.Joy.Happiness,temperature:4}],[]),//4
            new Quote('Maecenas nunc mauris, interdum ut dapibus vitae, sollicitudin in arcu.','bar',Sentiment.Negative,[{emotion:Emotion.Sadness.Grief,temperature:2},{emotion:Emotion.Disgust.Contempt,temperature:2}],['brooding','dark']),//4
            new Quote('Curabitur aliquet quam id dui posuere blandit.', 'quote6', Sentiment.Neutral, [{ emotion: Emotion.Surprise.Wonder, temperature: 3 }], ['wonder']),
            new Quote('Donec sollicitudin molestie malesuada.', 'quote7', Sentiment.Negative, [{ emotion: Emotion.Sadness.Sorrow, temperature: 2 }, { emotion: Emotion.Disgust.Scorn, temperature: 2 }], ['sorrow', 'scorn']),//4
            new Quote('Suspendisse ut porttitor diam. Integer varius elit vitae condimentum iaculis.','baz',Sentiment.Positive,[{emotion:Emotion.Joy.Relief,temperature:3},{emotion:Emotion.Interest.Kindness,temperature:5}],['hopeful']),//20
        ];


        function getQuoteCollectionInstance():QuoteCollection{
            return new QuoteCollection(quoteArray);
        }

        test("data getter returns the original data", async() => {
            const quoteCollection=getQuoteCollectionInstance();
            expect(quoteCollection.data).toBeInstanceOf(Array<Quote>);
            expect(quoteCollection.data).toMatchObject(quoteArray);
        });

        describe("find()",() => {
            test("Returns the matching quote by slug when it exists", async() => {
                const quoteCollection=getQuoteCollectionInstance();
                const slug='foo';
                const result=quoteCollection.find(slug);
                expect(result).toBeInstanceOf(Quote);
                expect(result?.slug).toBe(slug);
            });

            test("Returns undefined when no quote is found", async() => {
                const quoteCollection=getQuoteCollectionInstance();
                const slug='invalid';
                const result=quoteCollection.find(slug);
                expect(result).not.toBeInstanceOf(Quote);
                expect(result).toBe(undefined);
            });

        });

        describe("clone()",() => {
            test("Returns a cloned object", async() => {
                const quoteCollection=getQuoteCollectionInstance();
                const cloned=quoteCollection.clone();
                expect(cloned).toBeInstanceOf(QuoteCollection);
                expect(cloned).toMatchObject(quoteCollection);
                expect(cloned).toStrictEqual(quoteCollection);
                expect(cloned.data).toStrictEqual(quoteCollection.data);
                expect(cloned).not.toBe(quoteCollection);

            });

            test("Clone doesn't affect the original instance", async() => {
                const quoteCollection=getQuoteCollectionInstance();
                const cloned=quoteCollection.clone();
                const alteredClone=cloned.clone().filterBySentiment(Sentiment.Neutral);


                expect(alteredClone.data).not.toStrictEqual(cloned.data);
            });
        });

        describe("orderByEmotionScoreDesc()",() => {

            test("Ordering direction is descending", async() => {
                const quoteCollection=getQuoteCollectionInstance();
                const contextEmotionMatrix:Emotion.EmotionMatrix=[
                    {emotion:Emotion.Interest.Kindness,temperature:4},
                    {emotion:Emotion.Sadness.Sorrow,temperature:2},
                    {emotion:Emotion.Sadness.Grief,temperature:3},
                    {emotion:Emotion.Joy.Happiness,temperature:1},

                ];

                quoteCollection.orderByEmotionScoreDesc(contextEmotionMatrix);

                const incorrectSequenceDetected=quoteCollection.data.some(function(quote,index, arr){
                    return arr[index+1]?.getEmotionScore(contextEmotionMatrix)>quote.getEmotionScore(contextEmotionMatrix);
                });

                const scoreArray=quoteCollection.data.map((quote) => {quote.getEmotionScore(contextEmotionMatrix)});
                const scoreArrayOrderedDesc=[...scoreArray].sort().reverse();

                expect(incorrectSequenceDetected).not.toBe(true);
                expect(scoreArrayOrderedDesc).toStrictEqual(scoreArray);

            });

            test("Mutating state in-place", async() => {
                const quoteCollection=getQuoteCollectionInstance();
                const originalQuoteCollection=quoteCollection.clone();


                const contextEmotionMatrix:Emotion.EmotionMatrix=[
                    {emotion:Emotion.Interest.Kindness,temperature:4},
                    {emotion:Emotion.Sadness.Sorrow,temperature:3},
                    {emotion:Emotion.Sadness.Grief,temperature:2},
                    {emotion:Emotion.Joy.Happiness,temperature:1},

                ];


                quoteCollection.orderByEmotionScoreDesc(contextEmotionMatrix);

                expect(quoteCollection.data.map(x=>x.slug)).not.toStrictEqual(originalQuoteCollection.data.map(x=>x.slug));

            });

        });


        describe("filterByEmotionScoreAboveZero()",() => {
            test("Doesn't contain any Quote that has emotion score above 0", async() => {
                const quoteCollection=getQuoteCollectionInstance();


                const contextEmotionMatrix:Emotion.EmotionMatrix=[
                    {emotion:Emotion.Interest.Kindness,temperature:4},
                    {emotion:Emotion.Sadness.Sorrow,temperature:3},
                    {emotion:Emotion.Sadness.Grief,temperature:2},
                    {emotion:Emotion.Joy.Happiness,temperature:1},
                ];


                quoteCollection.filterByEmotionScoreAboveZero(contextEmotionMatrix);

                expect(quoteCollection.data.some(x=>x.getEmotionScore(contextEmotionMatrix)<=0)).toBe(false);

            });

        });

        describe("filterByEmotions()",() => {
            test("Resulting Quotes contain all the emotions", async() => {
                const quoteCollection=getQuoteCollectionInstance();
                const emotions=[Emotion.Sadness.Sorrow,Emotion.Disgust.Scorn];
                quoteCollection.filterByEmotions(emotions);

                expect(quoteCollection.data.every(x=>x.hasEmotions(emotions))).toBe(true);

            });
        });

        describe("filterByTags()",() => {
            test("[REVISIT HERE]", async() => {
                //TODO: test

            });
        });

        describe("filterBySentiment()",() => {
            test("Resulting Quotes has the sentiment", async() => {
                const quoteCollection=getQuoteCollectionInstance();
                const sentiment=Sentiment.Neutral;
                quoteCollection.filterBySentiment(sentiment);

                expect(quoteCollection.data.every(x=>x.sentiment===sentiment)).toBe(true);

            });
        });

        describe("filterBySlugs()",() => {
            test("Resulting Quotes has one of the quote slugs", async() => {
                const quoteCollection=getQuoteCollectionInstance();
                const quoteSlugs=['foo','bar'];
                quoteCollection.filterBySlugs(quoteSlugs);

                expect(quoteCollection.data.some(x=>!quoteSlugs.includes(x.slug))).toBe(false);

            });
        });

        describe("merge()",() => {

            test("Mutating state in-place", async() => {
                const quoteCollection=getQuoteCollectionInstance();


                const anotherQuoteCollection=new QuoteCollection([
                    new Quote('lorem ipsum','some-unique-slug',Sentiment.Neutral,[{emotion:Emotion.Joy.Happiness,temperature:1}],[]),
                    new Quote('lorem ipsum 2','some-unique-slug2',Sentiment.Negative,[{ emotion: Emotion.Sadness.Sorrow, temperature: 2 }, { emotion: Emotion.Disgust.Scorn, temperature: 2 }],[])
                ]);

                const originalQuoteCollectionSlugs=quoteCollection.clone().data.map(x=>x.slug);
                quoteCollection.merge(anotherQuoteCollection);

                expect(quoteCollection.data.map(x=>x.slug)).not.toEqual(originalQuoteCollectionSlugs);
            });

            test("Merge result contains quotes that are from either of the collections", async() => {
                const quoteCollection=getQuoteCollectionInstance();

                const anotherQuoteCollection=new QuoteCollection([
                    new Quote('lorem ipsum','some-unique-slug',Sentiment.Neutral,[{emotion:Emotion.Joy.Happiness,temperature:1}],[]),
                    new Quote('lorem ipsum 2','some-unique-slug2',Sentiment.Negative,[{ emotion: Emotion.Sadness.Sorrow, temperature: 2 }, { emotion: Emotion.Disgust.Scorn, temperature: 2 }],[])
                ]);

                const mergeResult=quoteCollection.clone().merge(anotherQuoteCollection);

                const eachQuoteExistInEitherCollection=mergeResult.data.every(function (quote){
                    return quoteCollection.find(quote.slug) || anotherQuoteCollection.find(quote.slug);
                });

                expect(eachQuoteExistInEitherCollection).toBe(true);

            });

            test("Merge result doesn't contain duplicate Quotes", async() => {
                const quoteCollection=getQuoteCollectionInstance();

                const anotherQuoteCollection=new QuoteCollection([
                    new Quote('lorem ipsum','some-unique-slug',Sentiment.Neutral,[{emotion:Emotion.Joy.Happiness,temperature:1}],[]),
                    new Quote('this is a duplicate, exist in the other collection','foo',Sentiment.Negative,[{ emotion: Emotion.Sadness.Sorrow, temperature: 2 }, { emotion: Emotion.Disgust.Scorn, temperature: 2 }],[]),
                    new Quote('this is a duplicate, exist in the other collection','bar',Sentiment.Positive,[{ emotion: Emotion.Sadness.Sorrow, temperature: 2 }, { emotion: Emotion.Disgust.Scorn, temperature: 2 }],[]),
                    new Quote('lorem ipsum 2','some-unique-slug2',Sentiment.Negative,[{ emotion: Emotion.Sadness.Sorrow, temperature: 2 }, { emotion: Emotion.Disgust.Scorn, temperature: 2 }],[]),
                    new Quote('this is a duplicate, exist in THIS collection','bar',Sentiment.Positive,[{ emotion: Emotion.Sadness.Sorrow, temperature: 2 }, { emotion: Emotion.Disgust.Scorn, temperature: 2 }],[]),
                ]);

                quoteCollection.merge(anotherQuoteCollection);

                const hasDuplicateSlugs=quoteCollection.data.map(x=>x.slug).some((q,index,arr)=> arr.indexOf(q)!==index);

                expect(hasDuplicateSlugs).toBe(false);

            });


            describe("shuffle()",() => {
                test("Order changes", async() => {
                    const quoteCollection=getQuoteCollectionInstance();
                    const originalQuoteCollection=quoteCollection.clone();

                    quoteCollection.shuffle();

                    expect(quoteCollection.data.map(x=>x.slug)).not.toEqual(originalQuoteCollection.data.map(x=>x.slug));
                });


            });

            describe("selectCandidates()",() => {
                test("Maintains the elements (doesn't reduce) when there are few elements", async() => {
                    const quoteCollection=new QuoteCollection([
                        new Quote('lorem ipsum','some-unique-slug',Sentiment.Neutral,[{emotion:Emotion.Joy.Happiness,temperature:1}],[]),
                        new Quote('text','foo',Sentiment.Negative,[{ emotion: Emotion.Sadness.Sorrow, temperature: 2 }, { emotion: Emotion.Disgust.Scorn, temperature: 2 }],[]),
                    ]);
                    const originalLength=quoteCollection.data.length;

                    quoteCollection.selectCandidates();

                    expect(quoteCollection.data.length).toBe(originalLength);
                });

                test("Reduces size when there are sufficient elements", async() => {
                    const quoteCollection=getQuoteCollectionInstance();
                    const originalLength=quoteCollection.data.length;

                    quoteCollection.selectCandidates();

                    expect(quoteCollection.data.length).toBeLessThan(originalLength)
                });

                test("Doesn't throw exception when there is no quotes", async() => {
                    const quoteCollection=new QuoteCollection([]);

                    quoteCollection.selectCandidates();

                    expect(quoteCollection.data.length).toBe(0)
                });

                test("Subset is in original order and the first N quotes", async() => {
                    const quoteCollection=getQuoteCollectionInstance();
                    const originalQuoteArray=quoteCollection.clone().data;


                    quoteCollection.selectCandidates();

                    const orderingMatches=quoteCollection.data.every(function (q,i){
                        return originalQuoteArray[i].slug===q.slug;
                    });



                    expect(orderingMatches).toBe(true)
                });


            });

            describe("first()",() => {
                test("Returns the first element", async() => {
                    const quoteCollection=getQuoteCollectionInstance();

                    expect(quoteCollection.first()?.slug).toBe(quoteCollection.data[0].slug);

                });

                test("Returns undefined/null when there aren't any quotes", async() => {
                    const quoteCollection=new QuoteCollection([]);

                    expect(quoteCollection.first()).toBe(undefined);

                });
            });
        });
    });
});