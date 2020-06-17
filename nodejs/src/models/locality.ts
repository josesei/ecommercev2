import { Document, Types } from "mongoose";

export interface ILocality extends Document {
    localityName: string,
    localityZipCode: Types.Array<string>
}