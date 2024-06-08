import QuoteRepository from "./QuoteRepository.js";
import {Quote, QuoteCollection} from "./Quote.js";
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


    getQuote(actionContext:ActionContextDTO):Quote|undefined{

        //Case 1: if any other parameter along with slugs are provided: slugs and other filters will be applied separately and later be merged.
        //Case 2: if only slug param is provided, only will filter only by slugs.

        //TODO: reactivate .filterByTags(tags)*/
        //TODO: bug below. If only slugs are provided, it will get mixed with all others.



        let quotes:QuoteCollection;

        if(//Lord forgive me for this dire sin
            (actionContext?.quoteSlugs?.length??-1) && //has any quoteSlug
            actionContext.sentiment===null &&
            actionContext.emotionMetrics.length===0
        ){
            quotes=new QuoteCollection([]);
        }else{
            quotes=QuoteFacade.#quoteRepository.index();
        }


        if(actionContext.sentiment!==null){
            quotes=quotes.filterBySentiment(actionContext.sentiment);
        }
        if(actionContext.emotionMetrics.length>0){
            quotes=quotes.filterByEmotionScoreAboveZero(actionContext.emotionMetrics).orderByEmotionScoreDesc(actionContext.emotionMetrics);
        }

        quotes.selectCandidates();


        if((actionContext?.quoteSlugs?.length??-1)>0){//Damn this is ugly as hell
            let quotesBySlug=QuoteFacade.#quoteRepository.index().filterBySlugs(actionContext.quoteSlugs??[]);
            quotes.merge(quotesBySlug);
        }


        return quotes.shuffle().data[0];
    }

    getQuoteBySlug(slug:string):Quote|undefined{
        return QuoteFacade.#quoteRepository.find(slug);//Should we use the Repo's find or collection's find?
    }

}

