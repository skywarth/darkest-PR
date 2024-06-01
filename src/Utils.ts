export default class Utils{
    public static isEnvDebug():boolean{
        return process.env.DARKEST_PR_DEBUG_MODE=='TRUE';
    }

    public static shuffleArray<T>(array: T[]): T[] {
        //Thanks, source:https://stackoverflow.com/a/48083382
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    };
}