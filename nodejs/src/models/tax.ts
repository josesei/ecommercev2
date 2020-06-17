import { Document } from "mongoose";

export interface ITax extends Document {
    taxName: string,
    taxFactor: number,
    taxFixedAmount: number,
}