import {Emotion} from "../enums/Emotion.js";
import {Sentiment} from "../enums/Sentiment.js";

export interface ActionContextDTO{
    readonly emotionMetrics: Array<Emotion.EmotionMetric>,
    readonly sentiment:Sentiment|null,
    readonly tags:Array<string>

}