import { Document } from "mongoose";
import { ICountry } from "./country";
import { IRegion } from "./region";
import { ILocality } from "./locality";

export interface IPostalAddress extends Document {
        addressCountry: ICountry["_id"],
        addressRegion: IRegion["_id"],
        addressLocality: ILocality["_id"],
        addressZipCode: string,
        addressStreetName: string,
        addressStreetNumber: string,
        addressGeoLat?: number,
        addreessGeoLong?: number,
        isPostOfficeBox: boolean,
        addressPostOfficeBoxNumber?: string
}