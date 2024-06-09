export enum Sentiment{
    Negative="Negative",
    Positive="Positive",
    Neutral="Neutral"
}


const sentimentIcons:Array<{sentiment:Sentiment,icon:string}>=[
    {sentiment:Sentiment.Negative,icon:':imp:'},//or :skull:, :dagger:, :crossed_swords:
    {sentiment:Sentiment.Positive,icon:':candle:'},//or star2
    {sentiment:Sentiment.Neutral,icon:':scroll:'},//or :zap:, :eyes:, :ghost:
]

export function getSentimentIcon(sentiment: Sentiment):string|undefined{
    return sentimentIcons.find(q=>q.sentiment===sentiment)?.icon;
}