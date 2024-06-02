import PullRequestStrategy, {OctokitResponsePullRequest} from "./PullRequestStrategy.js";
import { Context } from "probot";
import { QuoteFacade } from "../../QuoteFacade.js";
import { Sentiment } from "../../enums/Sentiment.js";
import { Emotion } from "../../enums/Emotion.js";
import Comment from "../../Comment.js";
import { Quote } from "../../Quote.js";

export default class PullRequestOpenedStrategy extends PullRequestStrategy<'pull_request.opened'> {
    protected async executePrStrategy(ghContext: Context<'pull_request.opened'>,previousPRs:Array<OctokitResponsePullRequest>): Promise<void> {

        //CASE: Fresh
        let tags: Array<string> = ['begin', 'start', 'create', 'open'];
        let contextEmotionMetrics: Array<Emotion.EmotionMetric> = [
            {emotion: Emotion.Joy.Happiness, temperature: 2},
            {emotion: Emotion.Joy.Relief, temperature: 4},
            {emotion: Emotion.Joy.Ecstasy, temperature: 1}
        ];
        let caseSlug: string = 'pr-opened.fresh';
        let sentiment = Sentiment.Positive;

        if(previousPRs.length>0){
            //CASE: Re-open
            console.log('in*');
            const previousPR=previousPRs[0];

            tags=[...tags,'retry','attempt','try','again'];
            if(previousPR.merged_at){
                //CASE: Re-open, previously merged
                caseSlug='pr-opened.previously-merged';
                sentiment=Sentiment.Neutral;
                contextEmotionMetrics=[
                    {emotion: Emotion.Anger.Irritation, temperature: 2},
                    {emotion: Emotion.Anger.Frustration, temperature: 3},
                    {emotion: Emotion.Shame.Embarrassment, temperature: 5},
                    {emotion: Emotion.Shame.Remorse, temperature: 2},
                    {emotion: Emotion.Fear.Panic, temperature: 3},
                    {emotion: Emotion.Joy.Relief, temperature: 2},
                    {emotion: Emotion.Joy.Thrill, temperature: 1},
                ];
                tags=[...tags,'mistake','missing'];
            }else{
                //CASE: Re-open, previously closed
                caseSlug='pr-opened.previously-closed';
                sentiment=Sentiment.Negative;
                contextEmotionMetrics=[
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

        const quote: Quote = QuoteFacade.getInstance().getQuote(sentiment, contextEmotionMetrics, tags);
        const comment: Comment = new Comment(quote, caseSlug, contextEmotionMetrics)

        const issueComment = ghContext.issue(comment.getObject());
        console.log(issueComment);
        //ghContext.octokit.issues.createComment(issueComment);
    }
}
