import { Document } from "mongoose";

export interface IDistance extends Document{
    unitCode: string,
    valueNumber: number
}