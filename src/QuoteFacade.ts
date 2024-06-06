import QuoteRepository from "./QuoteRepository.js";
import {Quote} from "./Quote.js";
import {ActionContextDTO} from "./DTO/ActionContextDTO.js";

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
    getQuote(actionContext:ActionContextDTO):Quote{

        const repo=QuoteRepository.getInstance();
        //TODO: reactivate .filterByTags(tags)*/
        let quotes=repo.index();
        if(actionContext.sentiment!==null){
            quotes=quotes.filterBySentiment(actionContext.sentiment);
        }
        if(actionContext.emotionMetrics.length>0){
            quotes=quotes.filterByEmotionScoreAboveZero(actionContext.emotionMetrics).orderByEmotionScoreDesc(actionContext.emotionMetrics);
        }

        /*quotes.data.forEach(x=>console.log(x.getJSON(emotionMetrics)));
        console.log('PPP');*/
        //console.info(quotes.data.map(x=>x.getJSON()));

        return quotes.randomApplicable;
    }

}

