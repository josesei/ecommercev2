import { PostalAddress } from "../location/postaladdress";
import { Offer } from "./offer";
import { User } from "../user/user";
import { Currency } from "../payment/currency";
import { Invoice } from "../payment/invoice";
import { Address } from "cluster";

export class Order {
    #id: string;
    #acceptedOffer: Array<Offer>;
    #billingAddress: PostalAddress;
    #confirmationCode: string;
    #customer: User;
    #discountAmount: Number; //Monetary amount;
    #discountCurrency: Currency;
    #discountCode: string;
    #total: number;
    #totalCurrency: Currency;
    #isGift: boolean;
    #paymentURL: string;
    #invoice: Invoice;

    constructor(id:string, acceptedOffer:Array<Offer>, billingAddress:PostalAddress, confirmationCode:string, customer:User, discountAmount:number,
        discountCurrency:Currency, discountCode:string, total:number, totalCurrency: Currency, isGift:boolean, paymentURL: string, invoice: Invoice){
            this.#id=id;
            this.#acceptedOffer=acceptedOffer;
            this.#billingAddress=billingAddress;
            this.#confirmationCode=confirmationCode;
            this.#customer=customer;
            this.#discountAmount=discountAmount;
            this.#discountCurrency=discountCurrency;
            this.#discountCode=discountCode;
            this.#total=total;
            this.#totalCurrency=totalCurrency;
            this.#isGift=isGift;
            this.#paymentURL=paymentURL;
            this.#invoice=invoice;
        }
}