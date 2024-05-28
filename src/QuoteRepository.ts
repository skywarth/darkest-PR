
import Quote from "./Quote";
import {Emotion} from "./enums/Emotion";
export default class QuoteRepository{
    #quotes:Array<Quote>=[];


    constructor() {
        this.loadQuotes();
    }


    private loadQuotes(){
        this.#quotes=[
            new Quote('Lorem ipsum dolor sit amet, consectetur adipiscing elit.','foo',Sentiment.Neutral,[Emotion.Joy.Happiness],[]),
            //new Quote('Maecenas nunc mauris, interdum ut dapibus vitae, sollicitudin in arcu.','bar',Sentiment.Negative,['brooding','dark']),
            //new Quote('Suspendisse ut porttitor diam. Integer varius elit vitae condimentum iaculis.','baz',Sentiment.Positive,['hopeful']),
        ];
    }


     public get index(): Array<Quote> {
        return this.#quotes;
    }
}

