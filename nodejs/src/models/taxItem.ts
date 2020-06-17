import { Document } from "mongoose";
import { ITax } from "./tax";

export interface ITaxItem extends Document {
    referencedTax: ITax["_id"],
    taxFactor: number,
    taxFixedAmount: number,
}