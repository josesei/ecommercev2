import { User } from "../user/user";
import { Order } from "../order/order";
import { Currency } from "./currency";
import { PaymentMethod } from "./paymentMethod";
import { PaymentStatus } from "./paymentStatus";

export class Invoice {
    #id: string;
    #customer: User;
    #confirmationCode: string;
    #date: Date;
    #orderReferenced: Order;
    #paymentDueDate: Date;
    #paymentMethod: PaymentMethod;
    #totalPaymentDue: number;
    #totalPaymentCurrency: Currency;
    #paymentStatus: PaymentStatus;

    constructor(id:string, customer:User, confirmationCode:string, date:Date, orderReferenced:Order, paymentDueDate:Date, 
        paymentMethod:PaymentMethod, totalPaymentDue:number, totalPaymentCurrency:Currency, paymentStatus: PaymentStatus){
            this.#id = id;
            this.#customer=customer;
            this.#confirmationCode=confirmationCode;
            this.#date=date;
            this.#orderReferenced=orderReferenced;
            this.#paymentDueDate=paymentDueDate;
            this.#paymentMethod=paymentMethod;
            this.#totalPaymentDue=totalPaymentDue;
            this.#totalPaymentCurrency=totalPaymentCurrency;
            this.#paymentStatus=paymentStatus;
        }

}