
import {Quote,QuoteCollection} from "./Quote.js";
import { createRequire } from "module";

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
        const require = createRequire(import.meta.url);
        const rawQuoteData = require("./quote-data.json");
        let quoteArray:Array<Quote>=[];
        rawQuoteData.forEach(function (rawQuote:any){
            quoteArray.push(new Quote(rawQuote.text,rawQuote.slug,rawQuote.sentiment,rawQuote.emotion_matrix,rawQuote.tags))
        })
        this.#quotes=new QuoteCollection(quoteArray);
    }


    public index(): QuoteCollection {
        return this.#quotes.clone();
    }

    public find(slug:string):Quote | undefined{
        return this.#quotes.find(slug);
    }





}

