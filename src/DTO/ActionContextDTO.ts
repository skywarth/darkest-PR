import {Emotion} from "../enums/Emotion.js";
import {Sentiment} from "../enums/Sentiment.js";

export interface ActionContextDTO{
    readonly emotionMetrics: Array<Emotion.EmotionMetric>,
    readonly sentiment:Sentiment|null,
    readonly tags:Array<string>
    readonly quoteSlugs?:Array<string>,

}


export function actionContextFromPartial(partialData:Partial<ActionContextDTO>):ActionContextDTO{
    return {
        emotionMetrics:partialData?.emotionMetrics??[],
        sentiment:partialData?.sentiment??null,
        tags:partialData?.tags??[],
        quoteSlugs:partialData?.quoteSlugs??[]
    }
}