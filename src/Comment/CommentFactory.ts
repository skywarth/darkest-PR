import {QuoteFacade} from "../Quote/QuoteFacade.js";
import {Quote} from "../Quote/Quote.js";
import {ActionContextDTO} from "../DTO/ActionContextDTO.js";
import Comment, {ReplyContext} from "./Comment.js";

export class CommentFactory {

    #quoteFacade:QuoteFacade;

    #debugMode: boolean;
    #emojis: boolean;


    constructor(quoteFacade:QuoteFacade,debugMode: boolean, emojis: boolean) {
        this.#quoteFacade=quoteFacade;
        this.#debugMode = debugMode;
        this.#emojis = emojis;
    }


    get quoteFacade(): QuoteFacade {
        return this.#quoteFacade;
    }

    get debugMode(): boolean {
        return this.#debugMode;
    }

    get emojis(): boolean {
        return this.#emojis;
    }

    create(
        caseSlug: string,
        actionContext: ActionContextDTO,
        replyToContext: ReplyContext | null = null,
        warnings: Array<string> = []
    ): Comment | null {
        const quote: Quote | undefined = this.quoteFacade.getQuote(actionContext);
        if (!quote) {
            return null;
        }
        return new Comment(
            quote,
            caseSlug,
            actionContext,
            this.debugMode,
            this.emojis,
            replyToContext,
            warnings
        );
    }
}