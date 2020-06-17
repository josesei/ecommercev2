import { Document, Types } from "mongoose";
import { ILocality } from "./locality";

export interface IRegion extends Document {
    regionName: string,
    regionCode?: string,
    localities: Types.Array<ILocality["_id"]>
}