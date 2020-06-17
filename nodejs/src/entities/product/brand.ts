export class Brand {
    #brandID: string;
    #brandName: string;

    constructor(brandID:string, brandName:string){
        this.#brandID=brandID;
        this.#brandName=brandName;
    }
}