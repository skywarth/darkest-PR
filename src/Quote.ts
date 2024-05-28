class Quote{
    #text:string;
    #slug:string;
    #tags:Array<string>;


    constructor(text: string, slug: string, tags: Array<string>) {
        this.#text = text;
        this.#slug = slug;
        this.#tags = tags;
    }


    get text(): string {
        return this.#text;
    }

    get slug(): string {
        return this.#slug;
    }

    get tags(): Array<string> {
        return this.#tags;
    }
}