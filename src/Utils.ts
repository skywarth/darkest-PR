

export default class Utils{
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

    public static stringToBoolean(str:string):boolean{
        return str.toLowerCase()==='true';
    }

    public static toMarkdownList(arr: Array<string>, ordered: boolean = false): string {
        let mapped:Array<string>;
        if (ordered) {
            mapped=arr.map((item, index) => `${index + 1}. ${item}`);
        } else {
            mapped=arr.map(item => `- ${item}`);
        }
        return mapped.join('\n');
    }

    public static removeLeadingWhitespaces(input: string): string {
        return input
            .split('\n')
            .map(line => line.trimStart())
            .join('\n');
    }

    public static toBlockquote(content: string): string {
        return content
            .split('\n')
            .map(line => `> ${line}`)
            .join('\n');
    }
}


