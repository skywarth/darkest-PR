import {Context} from "probot";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {EventSubscriptionsDTO} from "../DTO/EventSubscriptionsDTO.js";
import {HasEventSubscriptions} from "./HasEventSubscriptions.js";





export class RepositoryConfig implements HasEventSubscriptions{
    static #CONFIG_PATH='.darkest-pr.json';

    #debug_mode:boolean
    #emojis:boolean
    #event_subscriptions: EventSubscriptionsDTO;
    //options for enable/disable actions


    constructor(conf:Partial<RepositoryConfig>) {
        this.#debug_mode = conf.debug_mode??false;
        this.#emojis = conf.emojis??true;
        this.#event_subscriptions=conf.event_subscriptions?? {};
    }

    public static async readConfigFromRepository(ghContext:Context):Promise<Partial<RepositoryConfig>>{

        try {
            //Alternative: await ghContext.octokit.config.get();
            //Alt 2: await context.config('config.yml')  //https://probot.github.io/api/latest/classes/context.Context.html#config
            const configFileResponse = await ghContext.octokit.repos.getContent({
                owner:ghContext.repo().owner,
                repo:ghContext.repo().repo,
                path: this.#CONFIG_PATH,
            });

            //if (!('content' in configFileResponse.data)) {

            if (!(configFileResponse?.data) || !('content' in configFileResponse.data)) {
                throw new Error('Invalid configuration file format.');
            }

            const content = Buffer.from(configFileResponse.data.content, 'base64').toString('utf8');
            const config:Partial<RepositoryConfig> = JSON.parse(content);

            return config;
        } catch (error:any) {
            if(error.status){
                //It is said Octokit request errors ALWAYS have status attribute/prop: https://www.npmjs.com/package/@octokit/request-error
                //This section is for Octokit request errors
                if(error.status===404){
                    //Config file is not present in the target dir of the repository
                    ghContext.log.error(error,'Config file is not present in the target dir of the repository');
                }else{
                    ghContext.log.error(error,'Unknown HTTP error while fetching configuration file', );
                }
            }else if(error instanceof SyntaxError){
                ghContext.log.error(error,'Config file is malformed, cannot be parsed.');
            }
            else{
                ghContext.log.error(error,'Error fetching configuration file');
            }


            return {};
        }
    }

    get debug_mode(): boolean {
        return this.#debug_mode;
    }

    get emojis(): boolean {
        return this.#emojis;
    }


    get defaultEventSubscription():boolean{
        return true;
    }


    get event_subscriptions(): EventSubscriptionsDTO {
        return this.#event_subscriptions;
    }


    isEventSubscriptionEnabled(event: EmitterWebhookEventName): boolean {
        return this.event_subscriptions[event] ?? this.defaultEventSubscription;
    }
}