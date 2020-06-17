import { ICurrency } from "./currency";
import { IPaymentMethod } from "./paymentMethod";
import { PaymentStatus } from "../entities/payment/paymentStatus";
import { IOrder } from "./order";
import { IUser } from "./user";
import { Document } from "mongoose";
import { ITaxItem } from "./taxItem";

export interface IInvoice extends Document {
    customer: IUser["_id"],
    confirmationCode: string,
    date: Date,
    orderReferenced: IOrder["_id"],
    paymentDueDate: Date,
    paymentMethod: IPaymentMethod["_id"],
    paymentMethodSurchargeFactor: number,
    paymentMethodAdditionalPrice: number,
    tax: Array<ITaxItem["_id"]>,
    totalPaymentDue: number,
    totalPaymentCurrency: ICurrency["_id"],
    paymentStatus: PaymentStatus
}