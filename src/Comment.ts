import {Quote} from "./Quote/Quote.js";
import {Emotion} from "./enums/Emotion";
import {ActionContextDTO} from "./DTO/ActionContextDTO.js";
import Utils from "./Utils.js";
import {getSentimentIcon} from "./enums/Sentiment.js";
import {RepositoryConfig} from "./Config/RepositoryConfig.js";

export type ReplyContext={
    replyToUsername:string,
    replyingToMessage:string
}


export default class Comment{
    #quote:Quote;
    #caseSlug:string;
    #actionContext:ActionContextDTO;
    #warnings:Array<string>;
    #replyToContext:ReplyContext|null;

    constructor(quote: Quote,caseSlug:string,actionContext:ActionContextDTO,replyToContext:ReplyContext|null=null,warnings:Array<string>=[]) {
        this.#quote = quote;
        this.#caseSlug=caseSlug;
        this.#actionContext=actionContext;
        this.#warnings=warnings;
        this.#replyToContext=replyToContext;
    }


    get quote(): Quote {
        return this.#quote;
    }

    get quoteTextFormatted():string{
        return `### ${getSentimentIcon(this.quote.sentiment)} <mark>***${this.quote.text}***</mark>`
    }


    get caseSlug(): string {
        return this.#caseSlug;
    }


    get actionContext(): ActionContextDTO {
        return this.#actionContext;
    }


    get debugMode(): boolean {
        return RepositoryConfig.getInstance().debug_mode;
    }

    get replyToContext(): ReplyContext | null {
        return this.#replyToContext;
    }

    get replyToContextFormatted():string{
        let str=`
        Replying to: @${this.replyToContext?.replyToUsername} \n \n
        <details>
            <summary>Original message</summary>
            
            ${Utils.toBlockquote(this.replyToContext?.replyingToMessage??'')}
            
        </details>
        `
        str=Utils.removeLeadingWhitespaces(str);
        return str;
    }

    get warnings(): Array<string> {
        return this.#warnings;
    }

    get contextEmotionMatrix(): Emotion.EmotionMatrix {
        return this.actionContext.emotionMatrix;
    }

    get body():string{
        let body='';
        if(this.replyToContext){
            body+=this.replyToContextFormatted+` \n<br> \n\n`;
        }
        body+=this.quoteTextFormatted+'\n';

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

        if(this.debugMode){
            const debugText= Utils.removeLeadingWhitespaces(`
            ---
            Debug:
            ### Case
            - Slug: ${this.caseSlug}
            ### Quote
            - Slug: \`${this.quote.slug}\`
            - Emotions: \`${JSON.stringify(this.quote.emotionMatrix)}\`
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