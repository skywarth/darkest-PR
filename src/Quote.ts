import {Emotion} from "./enums/Emotion";

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


}
