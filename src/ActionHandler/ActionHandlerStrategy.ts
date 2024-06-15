import { Context } from "probot";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {RepositoryConfig} from "../Config/RepositoryConfig.js";
import {EventSubscriptionHandler} from "../Config/EventSubscriptionHandler/EventSubscriptionHandler.js";
import {BotConfig} from "../Config/BotConfig.js";
import {CommentFactory} from "../Comment/CommentFactory.js";
import {QuoteFacade} from "../Quote/QuoteFacade.js";
import Comment from "../Comment/Comment.js";


export default abstract class ActionHandlerStrategy<T extends EmitterWebhookEventName> {

    protected abstract execute(ghContext: Context<T>,commentFactory:CommentFactory): Promise<Comment|null>;

    protected abstract getEventName():EmitterWebhookEventName;

    protected async respond(ghContext:Context<T>,comment:Comment|null):Promise<void>{
        if(comment){
            const issueComment = ghContext.issue(comment.getObject());
            await ghContext.octokit.issues.createComment(issueComment);
        }
    }

    public async handle(ghContext: Context<T>): Promise<void> {


        const repositoryConfigPartial=await RepositoryConfig.readConfigFromRepository(ghContext as any as Context);
        const repoConfig=new RepositoryConfig(repositoryConfigPartial);

        const commentFactory=new CommentFactory(QuoteFacade.getInstance(),repoConfig.debug_mode,repoConfig.emojis);

        const botConfigSubsHandler=new EventSubscriptionHandler(BotConfig.getInstance());
        const repoConfigSubsHandler=new EventSubscriptionHandler(repoConfig);
        botConfigSubsHandler.nextHandler=repoConfigSubsHandler;


        //console.log(ghContext);
        if (!botConfigSubsHandler.handle(this.getEventName()) || ghContext.isBot) { // Replace with condition for this bot only
            return;
        }
        const comment:Comment|null=await this.execute(ghContext,commentFactory);
        await this.respond(ghContext,comment);
    }



}