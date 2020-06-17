import { PaymentMethod } from "../payment/paymentMethod";
import { Product } from "../product/product";
import { Currency } from "../payment/currency";

export class Offer {
    #id: string;
    #acceptedPaymentMethod: PaymentMethod
    #addOn: Offer;
    #product: Product;
    #validSince: Date;
    #validUntil: Date;
    #quantityOffered: number;
    #price: number;
    #priceCurrency: Currency;

    constructor(id: string, acceptedPaymentMethod:PaymentMethod, addOn: Offer, product: Product, validSince: Date, validUntil: Date, quantityOffered: number
        ,price: number, priceCurrency: Currency){
        this.#id = id;
        this.#acceptedPaymentMethod=acceptedPaymentMethod;
        this.#addOn=addOn;
        this.#product=product;
        this.#validSince=validSince;
        this.#validUntil=validUntil;
        this.#quantityOffered=quantityOffered;
        this.#price=price;
        this.#priceCurrency=priceCurrency;
    }
}