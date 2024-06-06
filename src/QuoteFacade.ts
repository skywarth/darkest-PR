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

    // @ts-ignore
    //TODO: remove ignore
    getQuote(emotionMetrics: Array<Emotion.EmotionMetric>, sentiment: Sentiment|null, tags: Array<string>):Quote{

        const repo=QuoteRepository.getInstance();
        //TODO: reactivate .filterByTags(tags)*/
        let quotes=repo.index();
        if(sentiment!==null){
            quotes=quotes.filterBySentiment(sentiment);
        }
        if(emotionMetrics.length>0){
            quotes=quotes.filterByEmotionScoreAboveZero(emotionMetrics).orderByEmotionScoreDesc(emotionMetrics);
        }

        /*quotes.data.forEach(x=>console.log(x.getJSON(emotionMetrics)));
        console.log('PPP');*/
        //console.info(quotes.data.map(x=>x.getJSON()));

        return quotes.randomApplicable;
    }

}

