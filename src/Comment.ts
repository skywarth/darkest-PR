import {Quote} from "./Quote/Quote.js";
import {Emotion} from "./enums/Emotion";
import {Config} from "./Config.js";
import {ActionContextDTO} from "./DTO/ActionContextDTO.js";
import Utils from "./Utils.js";

export default class Comment{
    #quote:Quote;
    #caseSlug:string;
    #actionContext:ActionContextDTO;
    #warnings:Array<string>;

    constructor(quote: Quote,caseSlug:string,actionContext:ActionContextDTO,warnings:Array<string>=[]) {
        this.#quote = quote;
        this.#caseSlug=caseSlug;
        this.#actionContext=actionContext;
        this.#warnings=warnings;
    }


    get quote(): Quote {
        return this.#quote;
    }

    get quoteTextFormatted():string{
        return `> *${this.quote.text}*`
    }


    get caseSlug(): string {
        return this.#caseSlug;
    }


    get actionContext(): ActionContextDTO {
        return this.#actionContext;
    }


    get warnings(): Array<string> {
        return this.#warnings;
    }

    get contextEmotionMetrics(): Emotion.EmotionMatrix {
        return this.actionContext.emotionMetrics;
    }

    get body():string{
        let body=this.quoteTextFormatted+'\n';

        if(this.warnings.length>0){
            body+=Utils.removeLeadingWhitespaces(
                `
                <br>
                \n
                ---
                
                **Warnings:** <br>
                ${Utils.toMarkdownList(this.warnings)}
                
                ---
                \n
                `);
        }

        if(Config.debug_mode){
            const debugText= Utils.removeLeadingWhitespaces(`
            ---
            Debug:
            ### Case
            - Slug: ${this.caseSlug}
            ### Quote
            - Slug: \`${this.quote.slug}\`
            - Emotions: \`${JSON.stringify(this.quote.emotionMetrics)}\`
            ### ActionContext
            - Context: \`${JSON.stringify(this.actionContext)}\`
            ---
            `)
            body+=`\n <br> \n`+debugText;
        }

        return body;
    }

    public getObject():{ body: string;}{
        return{
            body:this.body
        }
    }
}