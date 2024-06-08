import {Emotion} from "../enums/Emotion.js";
import {Sentiment} from "../enums/Sentiment.js";

/*
export interface ActionContextDTO{
    readonly emotionMetrics: Emotion.EmotionMatrix,
    readonly sentiment:Sentiment|null,
    readonly tags:Array<string>
    readonly quoteSlugs?:Array<string>,

}
*/


export class ActionContextDTO{
    #emotionMatrix: Emotion.EmotionMatrix;
    #sentiment:Sentiment|null;
    #tags:Array<string>;
    #quoteSlugs:Array<string>;


    constructor(emotionMatrix: Emotion.EmotionMatrix=[], sentiment: Sentiment | null=null, tags: Array<string>=[], quoteSlugs: Array<string>=[]) {
        this.#emotionMatrix = emotionMatrix;
        this.#sentiment = sentiment;
        this.#tags = tags;
        this.#quoteSlugs = quoteSlugs;
    }

    get emotionMatrix(): Emotion.EmotionMatrix {
        return this.#emotionMatrix;
    }

    get sentiment(): Sentiment | null {
        return this.#sentiment;
    }

    get tags(): Array<string> {
        return this.#tags;
    }

    get quoteSlugs(): Array<string> {
        return this.#quoteSlugs;
    }


    get hasQuoteSlugs():boolean{
        return this.quoteSlugs.length>0;
    }

    get hasSentiment():boolean{
        return this.sentiment!==null;
    }

    get hasEmotionMatrix():boolean{
        return this.emotionMatrix.length>0;
    }

    get hasTags():boolean{
        return this.tags.length>0;
    }

    get hasOnlyQuoteSlugs(){
        //Lord forgive me for this dire sin. It is such a monstrosity
        return (this.hasQuoteSlugs && //has any quoteSlug
        !this.hasSentiment &&
        !this.hasEmotionMatrix &&
        !this.hasTags)
    }
}
