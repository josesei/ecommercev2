import { WeightUnit } from "./weightUnit";

export class Weight {
    #unitCode:string; //UN/CEFACT Common Code (3 characters)
    #value:number;
    constructor(weightUnit:WeightUnit,value:number){
        this.#unitCode=weightUnit;
        this.#value=value;
    }
}