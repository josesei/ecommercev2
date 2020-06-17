import { Document } from "mongoose";
import { ICurrency } from "./currency";
import { IProduct } from "./product";
import { IPaymentMethod } from "./paymentMethod";

export interface IOffer extends Document {
    id: string,
    acceptedPaymentMethod: Array<IPaymentMethod["_id"]>,
    discountFactor: number,
    discountFixedAmount: number,
    totalDiscount: number,
    discountCurrency: ICurrency["_id"];
    discountCode: string,
    addOn: IOffer["_id"],
    product: IProduct["_id"],
    validSince: Date,
    validUntil: Date,
    quantityOffered: number,
    initialPrice: number,
    finalPrice: number,
    priceCurrency: ICurrency["_id"]
}