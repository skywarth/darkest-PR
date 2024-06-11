import {Context} from "probot";

export class RepositoryConfig{
    static #CONFIG_PATH='.darkest-pr.json';

    #debug_mode:boolean
    #emojis:boolean
    //options for enable/disable actions

    static #instance:RepositoryConfig;

    private constructor(conf:Partial<RepositoryConfig>) {
        this.#debug_mode = conf.debug_mode??false;
        this.#emojis = conf.emojis??true;
    }

    public static getInstance():RepositoryConfig{

        if (!this.#instance) {
            throw new Error('RepositoryConfig is not initialized yet! Initialize an instance by calling RepositoryConfig#initialize()');
        }
        return this.#instance;
    }

    public static async initialize(ghContext:Context):Promise<void>{
        if(this.#instance){
            throw new Error("RepositoryConfig is already initialized! It's a singleton, don't initialize again.");
        }
        this.#instance = new this(await this.readConfigFromRepository(ghContext));
    }

    private static async readConfigFromRepository(ghContext:Context):Promise<Partial<RepositoryConfig>>{

        try {
            const configFileResponse = await ghContext.octokit.repos.getContent({
                owner:ghContext.repo().owner,
                repo:ghContext.repo().repo,
                path: this.#CONFIG_PATH,
            });

            if (!('content' in configFileResponse.data)) {
                throw new Error('Invalid configuration file format.');
            }

            const content = Buffer.from(configFileResponse.data.content, 'base64').toString('utf8');
            const config:Partial<RepositoryConfig> = JSON.parse(content);

            return config;
        } catch (error) {
            console.log(error);
            ghContext.log.error('Error fetching configuration file:', error);
            return {};
        }
    }

    get debug_mode(): boolean {
        return this.#debug_mode;
    }

    get emojis(): boolean {
        return this.#emojis;
    }
}