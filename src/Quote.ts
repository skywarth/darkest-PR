import {Emotion} from "./enums/Emotion.js";
import {Sentiment} from "./enums/Sentiment.js";
import Utils from "./Utils.js";

export class Quote{
    #text:string;
    #slug:string;
    #tags:Array<string>;
    #emotionMetrics:Array<Emotion.EmotionMetric>
    #sentiment: Sentiment;


    constructor(text: string, slug: string, sentiment:Sentiment, emotionMetrics:Array<Emotion.EmotionMetric>, tags: Array<string>) {
        this.#text = text;
        this.#slug = slug;
        this.#tags = tags;
        this.#sentiment=sentiment;
        this.#emotionMetrics=emotionMetrics;
    }


    get text(): string {
        return this.#text;
    }

    get slug(): string {
        return this.#slug;
    }

    get sentiment(): Sentiment {
        return this.#sentiment;
    }


    get emotionMetrics(): Array<Emotion.EmotionMetric> {
        return this.#emotionMetrics;
    }

    get tags(): Array<string> {
        return this.#tags;
    }


    public hasEmotions(emotions:Array<Emotion.Types>):boolean{
        return emotions.every(e=>this.emotionMetrics.map(emotionMetric=>emotionMetric.emotion).includes(e));
    }

    public hasTags(tags:Array<string>):boolean{
        return tags.every(t=>this.tags.includes(t));
    }

    public getEmotionScore(emotionMetrics:Array<Emotion.EmotionMetric>):number{

        let scoreSum=0;
        const outerThis=this;
        emotionMetrics.forEach(function(emotionMetric:Emotion.EmotionMetric){
            const multiplier=emotionMetric.temperature;
            let temperature=outerThis.emotionMetrics.find(x=>x.emotion===emotionMetric.emotion)?.temperature??0;
            scoreSum+=(multiplier*temperature);
        });
        return scoreSum;

    }

    public getJSON():string{//TODO: rudimentary, remove or adjust
        return JSON.stringify({
            slug:this.slug,
            emotionMetrics:this.emotionMetrics,

        })
    }


}


export class QuoteCollection{
    #quotes:Array<Quote>;


    constructor(quotes: Array<Quote>) {
        this.#quotes = quotes;
    }


    get data(): Array<Quote> {
        return this.#quotes;
    }

    public find(slug:string):Quote | undefined{
        return this.data.find(q=>q.slug===slug);
    }

    public orderByEmotionScoreDesc(emotionMetrics:Array<Emotion.EmotionMetric>):QuoteCollection{

        //return new QuoteCollection([...this.data].sort((x:Quote)=>x.getEmotionScore(emotionMetrics)).reverse());
        return new QuoteCollection([...this.data].sort(function (q1:Quote,q2:Quote){
            //descending order
            return q2.getEmotionScore(emotionMetrics)-q1.getEmotionScore(emotionMetrics);
        }));
    }

    public filterByEmotionScoreAboveZero(emotions:Array<Emotion.EmotionMetric>):QuoteCollection{
        return new QuoteCollection(this.data.filter(q=>(q.getEmotionScore(emotions)>0)));
    }

    public filterByEmotions(emotions:Array<Emotion.Types>):QuoteCollection{
        return new QuoteCollection(this.data.filter(q=>q.hasEmotions(emotions)));
    }

    public filterByTags(tags:Array<string>):QuoteCollection{
        return new QuoteCollection(this.data.filter(q=>q.hasTags(tags)));
    }

    public filterBySentiment(sentiment:Sentiment):QuoteCollection{
        return new QuoteCollection(this.data.filter(q=>(q.sentiment===sentiment)));
    }

    public get randomApplicable():Quote{
        const divisionModifier:number=3;
        const originalAmount=this.data.length;
        const applicableCount:number=(Math.round(originalAmount/divisionModifier))>=2?(originalAmount/divisionModifier):originalAmount;
        return Utils.shuffleArray([...this.data].splice(0,applicableCount))[0];
    }


}
