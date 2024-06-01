import QuoteRepository from "./QuoteRepository.js";
import {Quote} from "./Quote.js";
import {Sentiment} from "./enums/Sentiment.js";
import {Emotion} from "./enums/Emotion.js";

export class QuoteFacade{

    getQuote(sentiment:Sentiment,emotionMetrics:Array<Emotion.EmotionMetric>):Quote{
        const repo=QuoteRepository.getInstance();
        let quotes=repo.index().filterBySentiment(sentiment).orderByEmotionScoreDesc(emotionMetrics);
        //console.info(quotes.data.map(x=>x.getJSON()));
        return quotes.data[0];
    }

}

