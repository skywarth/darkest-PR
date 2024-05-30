import {Emotion} from "./enums/Emotion.js";
import {Sentiment} from "./enums/Sentiment.js";

export default class Quote{
    #text:string;
    #slug:string;
    #tags:Array<string>;
    #emotions:Array<Emotion.Types>
    #sentiment: Sentiment;


    constructor(text: string, slug: string, sentiment:Sentiment, emotions:Array<Emotion.Types>, tags: Array<string>) {
        this.#text = text;
        this.#slug = slug;
        this.#tags = tags;
        this.#sentiment=sentiment;
        this.#emotions=emotions;
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


    get emotions(): Array<Emotion.Types> {
        return this.#emotions;
    }

    get tags(): Array<string> {
        return this.#tags;
    }


    public hasEmotions(emotions:Array<Emotion.Types>):boolean{
        return emotions.every(e=>this.emotions.includes(e));
    }

    public hasTags(tags:Array<string>):boolean{
        return tags.every(t=>this.tags.includes(t));
    }


}
