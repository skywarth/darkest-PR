import QuoteRepository from "./QuoteRepository";
import Quote from "./Quote";

export class QuoteFacade{

    getQuote():Array<Quote>{
        const repo=QuoteRepository.getInstance();
        return repo.index();
    }

}

