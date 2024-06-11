import Utils from "../Utils.js";

export class BotConfig{
    #bot_name:string;
    #active:boolean;



    static #instance:BotConfig;
    private constructor() {
        this.#bot_name=this.envAccessor(process.env.DARKEST_PR_BOT_NAME,'Darkest-PR')
        this.#active=this.envAccessor(process.env.DARKEST_PR_ACTIVE,false,Utils.stringToBoolean,);
    }



    get bot_name(): string {
        return this.#bot_name;
    }

    get active(): boolean {
        return this.#active;
    }

    public static getInstance():BotConfig{
        if (!this.#instance) {
            this.#instance = new this();
        }
        return this.#instance;
    }

    envAccessor(
        env:string|undefined,
        defaultVal:any,
        caster:((env:string)=>any)=function (env:string){
            return env;
        }
    ){
        if(env){
            return caster(env);
        }else{
            return (typeof defaultVal === 'function')?defaultVal():defaultVal;
        }

    }

}