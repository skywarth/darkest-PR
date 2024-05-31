export namespace Emotion {

//https://www.jmu.edu/counselingctr/files/About%20Emotions.pdf
//https://simple.wikipedia.org/wiki/List_of_emotions
    export enum Anger {
        Frustration = "Frustration",
        Fury = "Fury",
        Wrath = "Wrath",
        Irritation = "Irritation",
        Rage="Rage"
    }

    export enum Sadness {
        Grief = "Grief",
        Sorrow = "Sorrow",
        Melancholy = "Melancholy",
        Despair = "Despair",
        Loneliness="Loneliness"
    }

    export enum Fear {
        Anxiety = "Anxiety",
        Terror = "Terror",
        Fright = "Fright",
        Panic = "Panic"
    }

    export enum Joy {
        Happiness = "Happiness",
        Enjoyment = "Enjoyment",
        Relief = "Relief",
        Thrill = "Thrill",
        Ecstasy = "Ecstasy",
    }

    export enum Interest{
        Acceptance="Acceptance",
        Friendliness="Friendliness",
        Trust="Trust",
        Kindness="Kindness",
    }

    export enum Surprise{
        Shock="Shock",
        Amazement="Amazement",
        Wonder="Wonder"
    }

    export enum Disgust{
        Contempt="Contempt",
        Scorn="Scorn",
        Hatred="Hatred"
    }

    export enum Shame{
        Guilt="Guilt",
        Embarrassment="Embarrassment",
        Remorse="Remorse",
        Regret="Regret"
    }





    export type Types = Anger | Sadness | Fear | Joy | Interest | Surprise | Disgust | Shame;

    export type Temperature= 1|2|3|4|5;

    export type EmotionMetric={
        emotion:Emotion.Types,
        temperature:Temperature
    };

}
