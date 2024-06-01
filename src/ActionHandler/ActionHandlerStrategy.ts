import {Context} from "probot";

export default abstract class ActionHandlerStrategy {

    protected abstract execute(ghContext:Context):void;

    public handle(ghContext:Context){
        //console.log(ghContext);
        if(ghContext.isBot){//Replace with condition for this bot only
           return;
        }
        this.execute(ghContext);
    }

}