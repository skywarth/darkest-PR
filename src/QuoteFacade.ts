import QuoteRepository from "./QuoteRepository.js";
import Quote from "./Quote.js";

export class QuoteFacade{

    getQuote():Array<Quote>{
        const repo=QuoteRepository.getInstance();
        return repo.index();
    }

}

