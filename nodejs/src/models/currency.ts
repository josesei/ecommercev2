import { Document, Types } from "mongoose";

export interface ICurrency extends Document {
    currencyName: string,
    currencySymbol: string,
    conversion: Types.Array<IConversion>
}

interface IConversion {
    toCurrency: ICurrency["_id"],
    conversionFactor: number
}