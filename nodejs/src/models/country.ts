import { Document, Types } from "mongoose";
import { IRegion } from "./region";

export interface ICountry extends Document {
    countryName: string,
    countryCode: string,
    region: Types.Array<IRegion["_id"]>
}