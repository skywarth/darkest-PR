
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
            new Quote('Maecenas nunc mauris, interdum ut dapibus vitae, sollicitudin in arcu.','bar',Sentiment.Negative,[Emotion.Sadness.Grief,Emotion.Disgust.Contempt],['brooding','dark']),
            new Quote('Suspendisse ut porttitor diam. Integer varius elit vitae condimentum iaculis.','baz',Sentiment.Positive,[Emotion.Joy.Relief,Emotion.Interest.Kindness],['hopeful']),
        ];
    }


    public index(): Array<Quote> {
        return this.#quotes;
    }

    public find(slug:string,quotes:Array<Quote>=this.index()):Quote | undefined{
        return quotes.find(q=>q.slug===slug);
    }

    public filterByEmotions(emotions:Array<Emotion.Types>,quotes:Array<Quote>=this.index()):Array<Quote>{
        return quotes.filter(q=>q.hasEmotions(emotions));
    }

    public filterByTags(tags:Array<string>,quotes:Array<Quote>=this.index()):Array<Quote>{
        return quotes.filter(q=>q.hasTags(tags));
    }

    public filterBySentiment(sentiment:Sentiment,quotes:Array<Quote>=this.index()):Array<Quote>{
        return quotes.filter(q=>q.sentiment===sentiment);
    }



}

