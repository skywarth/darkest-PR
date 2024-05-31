import Quote from "./Quote";
import Utils from "./Utils";

export default class Comment{
    #quote:Quote;
    #caseSlug:string;

    constructor(quote: Quote,caseSlug:string) {
        this.#quote = quote;
        this.#caseSlug=caseSlug;
    }


    get quote(): Quote {
        return this.#quote;
    }


    get caseSlug(): string {
        return this.#caseSlug;
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
            - Emotions: ${this.quote.emotions.toString()}
            ---
            `
            body=body+`<br><br>`+debugText;
        }

        return body;
    }

    public getObject():object{
        return{
            body:this.body
        }
    }
}