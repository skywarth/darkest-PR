export default class Utils{
    public static isEnvDebug():boolean{
        return process.env.DARKEST_PR_DEBUG_MODE=='TRUE';
    }
}