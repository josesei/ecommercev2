export class RefundType {
    #refundTypeID: string;
    #refundPercentage: number; //between 0 and 1 -> for example 50% = 0.5
    #refundName: string;

    constructor(refundTypeID:string, refundPercentage:number, refundName:string){
        this.#refundTypeID=refundTypeID;
        this.#refundPercentage=refundPercentage;
        this.#refundName=refundName;
    }
}