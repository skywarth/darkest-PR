import {Quote} from "../Quote/Quote";
import {Emotion} from "../enums/Emotion";
import {ActionContextDTO} from "../DTO/ActionContextDTO.js";
import Utils from "../Utils.js";
import {getSentimentIcon} from "../enums/Sentiment.js";
import {CaseSlugs} from "../enums/CaseSlug.js";

export type ReplyContext={
    replyToUsername:string,
    replyingToMessage:string
}


export default class Comment{
    #quote:Quote;
    #caseSlug:CaseSlugs.Types;
    #actionContext:ActionContextDTO;
    #warnings:Array<string>;
    #replyToContext:ReplyContext|null;
    #debugMode:boolean;
    #emojis:boolean;

    constructor(quote: Quote,caseSlug:CaseSlugs.Types,actionContext:ActionContextDTO,debugMode:boolean,emojis:boolean,replyToContext:ReplyContext|null=null,warnings:Array<string>=[]) {
        this.#quote = quote;
        this.#caseSlug=caseSlug;
        this.#actionContext=actionContext;
        this.#warnings=warnings;
        this.#replyToContext=replyToContext;

        this.#debugMode=debugMode;
        this.#emojis=emojis;

    }


    get quote(): Quote {
        return this.#quote;
    }

    get quoteTextFormatted():string{
        return `### ${this.emojis?getSentimentIcon(this.quote.sentiment):''} <mark>***${this.quote.text}***</mark>`
    }


    get caseSlug(): CaseSlugs.Types {
        return this.#caseSlug;
    }


    get actionContext(): ActionContextDTO {
        return this.#actionContext;
    }


    get debugMode(): boolean {
        return this.#debugMode;
    }


    get emojis(): boolean {
        return this.#emojis;
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