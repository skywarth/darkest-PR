import QuoteRepository from "./QuoteRepository.js";
import {Quote} from "./Quote.js";
import {ActionContextDTO} from "../DTO/ActionContextDTO.js";

export class QuoteFacade{

    //singleton pattern
    static #instance:QuoteFacade;
    static #quoteRepository:QuoteRepository;


    private constructor() {
        QuoteFacade.#quoteRepository=QuoteRepository.getInstance();
    }

    public static getInstance():QuoteFacade{
        if (!this.#instance) {
            this.#instance = new this();
        }
        return this.#instance;
    }

    // @ts-ignore
    //TODO: remove ignore
    getQuote(actionContext:ActionContextDTO):Quote|undefined{

        //TODO: reactivate .filterByTags(tags)*/
        let quotes=QuoteFacade.#quoteRepository.index();


        if(actionContext.sentiment!==null){
            quotes=quotes.filterBySentiment(actionContext.sentiment);
        }
        if(actionContext.emotionMetrics.length>0){
            quotes=quotes.filterByEmotionScoreAboveZero(actionContext.emotionMetrics).orderByEmotionScoreDesc(actionContext.emotionMetrics);
        }

        /*quotes.data.forEach(x=>console.log(x.getJSON(emotionMetrics)));
        console.log('PPP');*/
        //console.info(quotes.data.map(x=>x.getJSON()));



        if((actionContext?.quoteSlugs?.length??-1)>0){//Damn this is ugly as hell
            let quotesBySlug=QuoteFacade.#quoteRepository.index().filterBySlugs(actionContext.quoteSlugs??[]);
            quotes.merge(quotesBySlug);
        }

        return quotes.randomApplicable;
    }

    getQuoteBySlug(slug:string):Quote|undefined{
        return QuoteFacade.#quoteRepository.find(slug);//Should we use the Repo's find or collection's find?
    }

}

