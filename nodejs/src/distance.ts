import { DistanceUnit } from "./distanceUnit";

export class Distance{
    #unitCode:string; //UN/CEFACT Common Code (3 characters)
    #value:number;

    constructor(distanceUnit:DistanceUnit, value:number){
        this.#unitCode = distanceUnit;
        this.#value = value;
    }
}

