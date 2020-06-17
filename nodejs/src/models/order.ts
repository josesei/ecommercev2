import { Document, Types } from "mongoose";
import { ICurrency } from "./currency";
import { IUser } from "./user"
import { IPostalAddress } from "./postalAddress";
import { IOffer } from "./offer";
import { IInvoice } from "./invoice";

export interface IOrder extends Document{
    acceptedOffer: Types.Array<IOffer["_id"]>,
    billingAddress: IPostalAddress["_id"],
    confirmationCode: string,
    customer: IUser["_id"],
    total: number;
    totalCurrency: ICurrency["_id"];
    isGift: boolean;
    paymentURL: string;
    invoice: IInvoice["_id"];
}