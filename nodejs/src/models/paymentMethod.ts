import { Document } from "mongoose";

export interface IPaymentMethod extends Document {
    paymentMethodName: string,
    surchargeFactor: number,
    surchargeAdditionalPrice: number
}