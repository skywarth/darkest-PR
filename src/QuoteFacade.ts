import QuoteRepository from "./QuoteRepository";
import Quote from "./Quote";

export class QuoteFacade{

    getQuote():Array<Quote>{
        const repo=new QuoteRepository();
        return repo.index;
    }

}

