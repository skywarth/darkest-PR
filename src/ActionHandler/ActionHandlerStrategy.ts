import { Context } from "probot";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {RepositoryConfig} from "../Config/RepositoryConfig.js";
import {EventSubscriptionHandler} from "../Config/EventSubscriptionHandler/EventSubscriptionHandler.js";
import {BotConfig} from "../Config/BotConfig.js";
import {CommentFactory} from "../Comment/CommentFactory.js";
import {QuoteFacade} from "../Quote/QuoteFacade.js";
import Comment from "../Comment/Comment.js";


export default abstract class ActionHandlerStrategy<T extends EmitterWebhookEventName> {

    #ghContext:Context<T>;


    constructor(ghContext: Context<T>) {
        this.#ghContext = ghContext;
    }


    get ghContext(): Context<T> {
        return this.#ghContext;
    }

    protected abstract execute(commentFactory:CommentFactory): Promise<Comment|null>;

    protected abstract getEventName():EmitterWebhookEventName;

    protected async respond(comment:Comment|null):Promise<void>{
        if(comment){
            const issueComment = this.ghContext.issue(comment.getObject());
            await this.ghContext.octokit.issues.createComment(issueComment);
        }
    }

    public async handle(): Promise<void> {


        const repositoryConfigPartial=await RepositoryConfig.readConfigFromRepository(this.ghContext as any as Context);
        const repoConfig=new RepositoryConfig(repositoryConfigPartial);

        const commentFactory=new CommentFactory(QuoteFacade.getInstance(),repoConfig.debug_mode,repoConfig.emojis);

        const botConfigSubsHandler=new EventSubscriptionHandler(BotConfig.getInstance());
        const repoConfigSubsHandler=new EventSubscriptionHandler(repoConfig);
        botConfigSubsHandler.nextHandler=repoConfigSubsHandler;


        //console.log(ghContext);
        if (!botConfigSubsHandler.handle(this.getEventName()) || !BotConfig.getInstance().active || this.ghContext.isBot) { // Replace with condition for this bot only
            return;
        }
        const comment:Comment|null=await this.execute(commentFactory);
        await this.respond(comment);
    }



}