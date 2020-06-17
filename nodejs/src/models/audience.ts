import { Document } from "mongoose";

export interface IAudience extends Document {
    audienceType: string
}