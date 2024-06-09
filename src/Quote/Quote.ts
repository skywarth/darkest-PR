import {Emotion} from "../enums/Emotion.js";
import {Sentiment} from "../enums/Sentiment.js";
import Utils from "../Utils.js";

export class Quote{
    #text:string;
    #slug:string;
    #tags:Array<string>;
    #emotionMatrix:Emotion.EmotionMatrix
    #sentiment: Sentiment;


    constructor(text: string, slug: string, sentiment:Sentiment, emotionMatrix:Emotion.EmotionMatrix, tags: Array<string>) {
        this.#text = text;
        this.#slug = slug;
        this.#tags = tags;
        this.#sentiment=sentiment;
        this.#emotionMatrix=emotionMatrix;
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


    get emotionMatrix(): Emotion.EmotionMatrix {
        return this.#emotionMatrix;
    }

    get tags(): Array<string> {
        return this.#tags;
    }


    public hasEmotions(emotions:Array<Emotion.Types>):boolean{
        return emotions.every(e=>this.emotionMatrix.map(emotionMetric=>emotionMetric.emotion).includes(e));
    }

    public hasTags(tags:Array<string>):boolean{
        return tags.every(t=>this.tags.includes(t));
    }

    public getEmotionScore(emotionMatrix:Emotion.EmotionMatrix):number{

        let scoreSum=0;
        const outerThis=this;
        emotionMatrix.forEach(function(emotionMetric:Emotion.EmotionMetric){
            const multiplier=emotionMetric.temperature;
            let temperature=outerThis.emotionMatrix.find(x=>x.emotion===emotionMetric.emotion)?.temperature??0;
            scoreSum+=(multiplier*temperature);
        });
        //console.log(this.getJSON());
        return scoreSum;

    }

    public getJSON(emotionMatrix:Emotion.EmotionMatrix=[]):string{//TODO: rudimentary, remove or adjust
        return JSON.stringify({
            slug:this.slug,
            emotionMatrix:this.emotionMatrix,
            emotionScore:this.getEmotionScore(emotionMatrix)

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

    public clone(){
        return new QuoteCollection(this.data);//Consider deep cloning
    }


    public orderByEmotionScoreDesc(emotionMatrix:Emotion.EmotionMatrix):QuoteCollection{

        //return new QuoteCollection([...this.data].sort((x:Quote)=>x.getEmotionScore(emotionMatrix)).reverse());
        this.#quotes.sort(function (q1:Quote,q2:Quote){
            //descending order
            return q2.getEmotionScore(emotionMatrix)-q1.getEmotionScore(emotionMatrix);
        });
        return this;
    }

    public filterByEmotionScoreAboveZero(emotions:Emotion.EmotionMatrix):QuoteCollection{
        this.#quotes=this.data.filter(q=>(q.getEmotionScore(emotions)>0));
        return this;
    }

    public filterByEmotions(emotions:Array<Emotion.Types>):QuoteCollection{
        this.#quotes=this.data.filter(q=>q.hasEmotions(emotions));
        return this;
    }

    public filterByTags(tags:Array<string>):QuoteCollection{
        this.#quotes=this.data.filter(q=>q.hasTags(tags));
        return this;
    }

    public filterBySentiment(sentiment:Sentiment):QuoteCollection{
        this.#quotes=this.data.filter(q=>(q.sentiment===sentiment));
        return this;
    }

    public filterBySlugs(slugs:Array<string>):QuoteCollection{
        this.#quotes=this.data.filter(q=>slugs.includes(q.slug));
        return this;
    }

    public merge(quoteCollection:QuoteCollection):QuoteCollection{

        const mergedArr:Array<Quote>=[...this.data,...quoteCollection.data];
        this.#quotes =[...new Map(mergedArr.map(q=>[q.slug,q])).values()];
        return this;
    }

    public shuffle():QuoteCollection{
        this.#quotes=Utils.shuffleArray(this.#quotes);
        return this;
    }

    public selectCandidates():QuoteCollection{
        const divisionModifier:number=3;
        const originalAmount=this.data.length;
        const candidateCount:number=(Math.round(originalAmount/divisionModifier))>=2?(originalAmount/divisionModifier):originalAmount;
        this.#quotes=this.data.splice(0,candidateCount);
        return this;
    }

    public first():Quote|undefined{
        return this.data[0];
    }



    public get randomApplicable():Quote|undefined{
        const divisionModifier:number=3;
        const originalAmount=this.data.length;
        const applicableCount:number=(Math.round(originalAmount/divisionModifier))>=2?(originalAmount/divisionModifier):originalAmount;
        //TODO: bug below, there could not be ordering at all. Maybe we should separate choosing applicables and randoming stuff?
        const applicables=Utils.shuffleArray([...this.data].splice(0,applicableCount));//TODO: simplify with below
        //applicables.forEach(x=>console.log(x.getJSON()));
        return applicables[0];
    }


}
