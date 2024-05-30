import ActionHandlerStrategy from "../ActionHandlerStrategy.js";
import {Context} from "probot";

export default abstract class PullRequestStrategy extends ActionHandlerStrategy{
    protected execute(ghContext: Context):void {
        return this.executePrStrategy(ghContext);
    }

    protected abstract executePrStrategy(ghContext: Context):void;
}