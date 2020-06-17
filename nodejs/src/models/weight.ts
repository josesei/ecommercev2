import { Document } from "mongoose";

export interface IWeight extends Document{
    unitCode: string,
    valueNumber: number
}