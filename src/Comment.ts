import {Quote} from "./Quote.js";
import {Emotion} from "./enums/Emotion";
import {Config} from "./Config.js";
import {ActionContextDTO} from "./DTO/ActionContextDTO.js";

export default class Comment{
    #quote:Quote;
    #caseSlug:string;
    #actionContext:ActionContextDTO;

    constructor(quote: Quote,caseSlug:string,actionContext:ActionContextDTO) {
        this.#quote = quote;
        this.#caseSlug=caseSlug;
        this.#actionContext=actionContext;
    }


    get quote(): Quote {
        return this.#quote;
    }


    get caseSlug(): string {
        return this.#caseSlug;
    }


    get actionContext(): ActionContextDTO {
        return this.#actionContext;
    }

    get contextEmotionMetrics(): Array<Emotion.EmotionMetric> {
        return this.actionContext.emotionMetrics;
    }

    get body():string{
        let body=this.quote.text;
        if(Config.debug_mode){
            const debugText= `
            ---
            Debug:
            ### Case
            - Slug: ${this.caseSlug}
            ### Quote
            - Slug: ${this.quote.slug}
            - Emotions: ${JSON.stringify(this.quote.emotionMetrics)}
            ### ActionContext
            - Context: ${JSON.stringify(this.actionContext)}
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