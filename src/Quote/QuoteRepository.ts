
import {Quote,QuoteCollection} from "./Quote.js";
//import rawQuoteData from "./quote-data.json"
import {Sentiment} from "../enums/Sentiment";
import {Emotion} from "../enums/Emotion";
export default class QuoteRepository{
    #quotes:QuoteCollection=new QuoteCollection([]);
    static #instance:QuoteRepository;




    private constructor() {
        this.loadQuotes();
    }

    public static getInstance():QuoteRepository{
        if (!this.#instance) {
            this.#instance = new this();
        }
        return this.#instance;
    }


    private loadQuotes(){
        /*let quoteArray:Array<Quote>=[];
        rawQuoteData.forEach(function (rawQuote:any){
            quoteArray.push(new Quote(rawQuote.text,rawQuote.slug,rawQuote.sentiment,rawQuote.emotion_matrix,rawQuote.tags))
        })
        this.#quotes=new QuoteCollection(quoteArray);*/

        this.#quotes=new QuoteCollection([
            new Quote('Lorem ipsum dolor sit amet, consectetur adipiscing elit.','foo',Sentiment.Neutral,[{emotion:Emotion.Joy.Happiness,temperature:4}],[]),
            new Quote('Maecenas nunc mauris, interdum ut dapibus vitae, sollicitudin in arcu.','bar',Sentiment.Negative,[{emotion:Emotion.Sadness.Grief,temperature:2},{emotion:Emotion.Disgust.Contempt,temperature:2}],['brooding','dark']),
            new Quote('Suspendisse ut porttitor diam. Integer varius elit vitae condimentum iaculis.','baz',Sentiment.Positive,[{emotion:Emotion.Joy.Relief,temperature:3},{emotion:Emotion.Interest.Kindness,temperature:5}],['hopeful']),
            new Quote('A setback, but not the end of things!','setback',Sentiment.Positive,[{emotion:Emotion.Joy.Relief,temperature:3}],['hopeful']),
            new Quote('Quisque velit nisi, pretium ut lacinia in, elementum id enim.', 'quote5', Sentiment.Positive, [{ emotion: Emotion.Joy.Enjoyment, temperature: 4 }], ['joyful']),
            new Quote('Curabitur aliquet quam id dui posuere blandit.', 'quote6', Sentiment.Neutral, [{ emotion: Emotion.Surprise.Wonder, temperature: 3 }], ['wonder']),
            new Quote('Donec sollicitudin molestie malesuada.', 'quote7', Sentiment.Negative, [{ emotion: Emotion.Sadness.Sorrow, temperature: 2 }, { emotion: Emotion.Disgust.Scorn, temperature: 2 }], ['sorrow', 'scorn']),
            new Quote('Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.', 'quote8', Sentiment.Positive, [{ emotion: Emotion.Joy.Happiness, temperature: 4 }], ['happiness']),
            new Quote('Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.', 'quote9', Sentiment.Neutral, [{ emotion: Emotion.Surprise.Shock, temperature: 3 }], ['shock']),
            new Quote('Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.', 'quote10', Sentiment.Negative, [{ emotion: Emotion.Anger.Frustration, temperature: 2 }, { emotion: Emotion.Sadness.Melancholy, temperature: 2 }], ['frustration', 'melancholy']),
            new Quote('Nulla porttitor accumsan tincidunt.', 'quote11', Sentiment.Positive, [{ emotion: Emotion.Joy.Enjoyment, temperature: 4 }], ['enjoyment']),
            new Quote('Cras ultricies ligula sed magna dictum porta.', 'quote12', Sentiment.Neutral, [{ emotion: Emotion.Interest.Kindness, temperature: 3 }], ['wonder']),
            new Quote('Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.', 'quote13', Sentiment.Negative, [{ emotion: Emotion.Sadness.Despair, temperature: 2 }, { emotion: Emotion.Disgust.Hatred, temperature: 2 },{ emotion: Emotion.Anger.Fury, temperature: 1 }], ['desperation', 'hatred']),
            new Quote('Pellentesque in ipsum id orci porta dapibus.', 'quote14', Sentiment.Positive, [{ emotion: Emotion.Joy.Happiness, temperature: 4 }], ['happiness']),
            new Quote('Proin eget tortor risus.', 'quote15', Sentiment.Neutral, [{ emotion: Emotion.Surprise.Amazement, temperature: 3 }], ['amazement']),
            new Quote('Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.', 'quote16', Sentiment.Negative, [{ emotion: Emotion.Anger.Rage, temperature: 2 }, { emotion: Emotion.Sadness.Loneliness, temperature: 2 }], ['rage', 'loneliness']),
            new Quote('Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;', 'quote17', Sentiment.Positive, [{ emotion: Emotion.Joy.Relief, temperature: 4 }], ['relief']),
            new Quote('Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.', 'quote18', Sentiment.Neutral, [{ emotion: Emotion.Surprise.Wonder, temperature: 3 }], ['wonder']),
            new Quote('Sed porttitor lectus nibh.', 'quote19', Sentiment.Negative, [{ emotion: Emotion.Sadness.Grief, temperature: 2 }, { emotion: Emotion.Disgust.Contempt, temperature: 2 }], ['grief', 'contempt']),
            new Quote('Vivamus suscipit tortor eget felis porttitor volutpat.', 'quote20', Sentiment.Positive, [{ emotion: Emotion.Joy.Enjoyment, temperature: 4 }], ['enjoyment']),
            new Quote('Curabitur aliquet quam id dui posuere blandit.', 'quote21', Sentiment.Neutral, [{ emotion: Emotion.Interest.Kindness, temperature: 3 }], ['kindness']),
            new Quote('Pellentesque in ipsum id orci porta dapibus.', 'quote22', Sentiment.Negative, [{ emotion: Emotion.Anger.Frustration, temperature: 2 }, { emotion: Emotion.Sadness.Sorrow, temperature: 2 }], ['frustration', 'sorrow']),
            new Quote('Nulla porttitor accumsan tincidunt.', 'quote23', Sentiment.Positive, [{ emotion: Emotion.Joy.Happiness, temperature: 4 }], ['happiness']),
            new Quote('Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;', 'quote24', Sentiment.Neutral, [{ emotion: Emotion.Surprise.Shock, temperature: 3 }], ['shock']),
            new Quote('Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.', 'quote25', Sentiment.Negative, [{ emotion: Emotion.Sadness.Grief, temperature: 2 }, { emotion: Emotion.Disgust.Hatred, temperature: 2 }], ['grief', 'hatred']),
            new Quote('Vivamus suscipit tortor eget felis porttitor volutpat.', 'quote26', Sentiment.Positive, [{ emotion: Emotion.Joy.Relief, temperature: 4 }], ['relief']),
            new Quote('Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.', 'quote27', Sentiment.Neutral, [{ emotion: Emotion.Interest.Acceptance, temperature: 3 }], ['acceptance']),
            new Quote('Pellentesque in ipsum id orci porta dapibus.', 'quote28', Sentiment.Negative, [{ emotion: Emotion.Anger.Irritation, temperature: 2 }, { emotion: Emotion.Sadness.Despair, temperature: 2 }], ['irritation', 'despair']),
            new Quote('Nulla porttitor accumsan tincidunt.', 'quote29', Sentiment.Positive, [{ emotion: Emotion.Joy.Thrill, temperature: 4 }], ['thrill']),
            new Quote('Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.', 'quote30', Sentiment.Neutral, [{ emotion: Emotion.Surprise.Wonder, temperature: 3 }], ['wonder']),
            new Quote('Donec sollicitudin molestie malesuada.', 'quote31', Sentiment.Negative, [{ emotion: Emotion.Sadness.Sorrow, temperature: 2 }, { emotion: Emotion.Disgust.Scorn, temperature: 2 }], ['sorrow', 'scorn']),
            new Quote('Suspendisse ut porttitor diam. Integer varius elit vitae condimentum iaculis.', 'quote32', Sentiment.Positive, [{ emotion: Emotion.Joy.Relief, temperature: 3 }, { emotion: Emotion.Interest.Kindness, temperature: 5 }], ['hopeful']),
            new Quote('Curabitur aliquet quam id dui posuere blandit.', 'quote33', Sentiment.Neutral, [{ emotion: Emotion.Surprise.Wonder, temperature: 3 }], ['wonder']),
            new Quote('Maecenas nunc mauris, interdum ut dapibus vitae, sollicitudin in arcu.', 'quote34', Sentiment.Negative, [{ emotion: Emotion.Sadness.Sorrow, temperature: 2 }, { emotion: Emotion.Disgust.Scorn, temperature: 2 }], ['sorrow', 'scorn']),
            new Quote('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'quote35', Sentiment.Positive, [{ emotion: Emotion.Joy.Happiness, temperature: 4 }], []),
            new Quote('Nulla porttitor accumsan tincidunt.', 'quote36', Sentiment.Neutral, [{ emotion: Emotion.Interest.Acceptance, temperature: 3 }], ['acceptance']),
            new Quote('Vivamus suscipit tortor eget felis porttitor volutpat.', 'quote37', Sentiment.Negative, [{ emotion: Emotion.Anger.Rage, temperature: 2 }, { emotion: Emotion.Sadness.Loneliness, temperature: 2 }], ['rage', 'loneliness']),
            new Quote('Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.', 'quote38', Sentiment.Positive, [{ emotion: Emotion.Joy.Enjoyment, temperature: 4 }], ['enjoyment']),
            new Quote('Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.', 'quote39', Sentiment.Neutral, [{ emotion: Emotion.Surprise.Amazement, temperature: 3 }], ['amazement']),
            new Quote('Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.', 'quote40', Sentiment.Negative, [{ emotion: Emotion.Anger.Fury, temperature: 2 },{ emotion: Emotion.Disgust.Hatred, temperature: 4 }, { emotion: Emotion.Sadness.Melancholy, temperature: 2 }], ['fury', 'melancholy']),
            new Quote('Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.', 'quote41', Sentiment.Positive, [{ emotion: Emotion.Joy.Thrill, temperature: 4 }], ['thrill']),
            new Quote('Proin eget tortor risus.', 'quote42', Sentiment.Neutral, [{ emotion: Emotion.Surprise.Wonder, temperature: 3 }], ['wonder']),
            new Quote('Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;', 'quote43', Sentiment.Negative, [{ emotion: Emotion.Sadness.Despair, temperature: 2 }, { emotion: Emotion.Disgust.Contempt, temperature: 2 }], ['despair', 'contempt']),
            new Quote('Curabitur aliquet quam id dui posuere blandit.', 'quote44', Sentiment.Positive, [{ emotion: Emotion.Joy.Happiness, temperature: 4 }], ['happiness']),
            new Quote('Donec sollicitudin molestie malesuada.', 'quote45', Sentiment.Neutral, [{ emotion: Emotion.Interest.Acceptance, temperature: 3 }], ['acceptance']),
            new Quote('Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.', 'quote46', Sentiment.Negative, [{ emotion: Emotion.Sadness.Grief, temperature: 2 }, { emotion: Emotion.Disgust.Hatred, temperature: 3 }], ['grief', 'hatred']),
            new Quote('Pellentesque in ipsum id orci porta dapibus.', 'quote47', Sentiment.Positive, [{ emotion: Emotion.Joy.Relief, temperature: 4 }], ['relief']),
            new Quote('Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.', 'quote48', Sentiment.Neutral, [{ emotion: Emotion.Surprise.Wonder, temperature: 3 }], ['wonder']),
            new Quote('Maecenas nunc mauris, interdum ut dapibus vitae, sollicitudin in arcu.', 'quote49', Sentiment.Negative, [{ emotion: Emotion.Sadness.Sorrow, temperature: 2 }, { emotion: Emotion.Disgust.Scorn, temperature: 2 }], ['sorrow', 'scorn']),
            new Quote('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'quote50', Sentiment.Positive, [{ emotion: Emotion.Joy.Happiness, temperature: 4 }], [])
        ]);
    }


    public index(): QuoteCollection {
        return this.#quotes.clone();
    }

    public find(slug:string):Quote | undefined{
        return this.#quotes.find(slug);
    }





}

