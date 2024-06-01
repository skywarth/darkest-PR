import {Quote} from "./Quote.js";
import Utils from "./Utils.js";
import {Emotion} from "./enums/Emotion";
import EmotionMetric = Emotion.EmotionMetric;

export default class Comment{
    #quote:Quote;
    #caseSlug:string;
    #contextEmotionMetrics:Array<EmotionMetric>;

    constructor(quote: Quote,caseSlug:string,contextEmotionMetrics:Array<EmotionMetric>) {
        this.#quote = quote;
        this.#caseSlug=caseSlug;
        this.#contextEmotionMetrics=contextEmotionMetrics;
    }


    get quote(): Quote {
        return this.#quote;
    }


    get caseSlug(): string {
        return this.#caseSlug;
    }


    get contextEmotionMetrics(): Array<Emotion.EmotionMetric> {
        return this.#contextEmotionMetrics;
    }

    get body():string{
        let body=this.quote.text;
        if(Utils.isEnvDebug()){
            const debugText= `
            ---
            Debug:
            ### Case
            - Slug: ${this.caseSlug}
            ### Quote
            - Slug: ${this.quote.slug}
            - Emotions: ${JSON.stringify(this.quote.emotionMetrics)}
            ### Context EmotionMetrics
            - Metrics: ${JSON.stringify(this.contextEmotionMetrics)}
            ---
            `
            body=body+`<br><br>`+debugText;
        }

        return body;
    }

    public getObject():{ body: string;}{
        return{
            body:this.body
        }
    }
}