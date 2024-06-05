import Utils from "./Utils.js";

export type ConfigSchema={
    readonly debug_mode:boolean,
    readonly bot_name:string,
}
export const Config:ConfigSchema={
    debug_mode:envAccessor(process.env.DARKEST_PR_DEBUG_MODE,false,Utils.stringToBoolean,),
    bot_name:envAccessor(process.env.DARKEST_PR_BOT_NAME,'Darkest-PR')

}

function envAccessor(
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