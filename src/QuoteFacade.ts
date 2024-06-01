import QuoteRepository from "./QuoteRepository.js";
import {Quote} from "./Quote.js";
import {Sentiment} from "./enums/Sentiment.js";
import {Emotion} from "./enums/Emotion.js";

export class QuoteFacade{

    //singleton pattern
    static #instance:QuoteFacade;


    private constructor() {

    }

    public static getInstance():QuoteFacade{
        if (!this.#instance) {
            this.#instance = new this();
        }
        return this.#instance;
    }

    getQuote(sentiment:Sentiment,emotionMetrics:Array<Emotion.EmotionMetric>,tags:Array<string>):Quote{
        const repo=QuoteRepository.getInstance();
        let quotes=repo.index().filterBySentiment(sentiment).filterByTags(tags).orderByEmotionScoreDesc(emotionMetrics);
        //console.info(quotes.data.map(x=>x.getJSON()));

        return quotes.randomApplicable;
    }

}

