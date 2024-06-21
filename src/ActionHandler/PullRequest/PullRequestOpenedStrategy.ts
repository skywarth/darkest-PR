import PullRequestStrategy, {OctokitResponsePullRequest} from "./PullRequestStrategy.js";
import { Sentiment } from "../../enums/Sentiment.js";
import { Emotion } from "../../enums/Emotion.js";
import {ActionContextDTO} from "../../DTO/ActionContextDTO.js";
import {EmitterWebhookEventName} from "@octokit/webhooks/dist-types/types";
import {CommentFactory} from "../../Comment/CommentFactory.js";
import Comment from "../../Comment/Comment";
import {CaseSlugs} from "../../enums/CaseSlug.js";

export default class PullRequestOpenedStrategy extends PullRequestStrategy<'pull_request.opened'> {

    protected getEventName(): EmitterWebhookEventName {
        return "pull_request.opened";
    }

    protected async executePrStrategy(commentFactory:CommentFactory,previousPRs:Array<OctokitResponsePullRequest>): Promise<Comment|null> {

        //CASE: Fresh
        let tags: Array<string> = ['begin', 'start', 'create', 'open'];
        let contextEmotionMatrix: Emotion.EmotionMatrix = [
            {emotion: Emotion.Joy.Happiness, temperature: 2},
            {emotion: Emotion.Joy.Relief, temperature: 4},
            {emotion: Emotion.Joy.Ecstasy, temperature: 1},
            {emotion: Emotion.Fear.Anxiety, temperature: 3},
            {emotion: Emotion.Fear.Fright, temperature: 2},
        ];
        let caseSlug: CaseSlugs.Types = CaseSlugs.PullRequest.Opened.Fresh;
        let sentiment = Sentiment.Positive;

        if(previousPRs.length>0){
            //CASE: Re-open
            const previousPR=previousPRs[0];

            tags=[...tags,'retry','attempt','try','again'];
            if(previousPR.merged_at){
                //CASE: Re-open, previously merged
                caseSlug=CaseSlugs.PullRequest.Opened.PreviouslyMerged;
                sentiment=Sentiment.Neutral;
                contextEmotionMatrix=[
                    {emotion: Emotion.Anger.Irritation, temperature: 2},
                    {emotion: Emotion.Anger.Frustration, temperature: 3},
                    {emotion: Emotion.Shame.Embarrassment, temperature: 5},
                    {emotion: Emotion.Shame.Remorse, temperature: 2},
                    {emotion: Emotion.Fear.Panic, temperature: 3},
                    {emotion: Emotion.Joy.Relief, temperature: 2},
                    {emotion: Emotion.Joy.Thrill, temperature: 1},
                    {emotion: Emotion.Fear.Anxiety, temperature: 4},
                    {emotion: Emotion.Fear.Fright, temperature: 1},
                    {emotion: Emotion.Interest.Acceptance, temperature: 1},
                ];
                tags=[...tags,'mistake','missing'];
            }else{
                //CASE: Re-open, previously closed
                caseSlug=CaseSlugs.PullRequest.Opened.PreviouslyClosed;
                sentiment=Sentiment.Negative;
                contextEmotionMatrix=[
                    {emotion: Emotion.Anger.Irritation, temperature: 4},
                    {emotion: Emotion.Anger.Frustration, temperature: 5},
                    {emotion: Emotion.Shame.Embarrassment, temperature: 2},
                    {emotion: Emotion.Shame.Remorse, temperature: 1},
                    {emotion: Emotion.Sadness.Grief, temperature:2},
                    {emotion: Emotion.Anger.Rage, temperature:2},
                    {emotion: Emotion.Anger.Fury, temperature:2},
                ];
                tags=[...tags,'rejection','struggle','denied','persistent','relentless','unwavering'];
            }

        }


        const actionContext=new ActionContextDTO(contextEmotionMatrix,sentiment,tags);
        const comment = commentFactory.create(caseSlug,actionContext);
        return comment;

    }
}
