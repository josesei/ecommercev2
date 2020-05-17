export class Audience {
    #audienceID:string;
    #audienceType:string;
    constructor(audienceID:string, audienceType:string){
        this.#audienceID=audienceID;
        this.#audienceType=audienceType;
    }
}