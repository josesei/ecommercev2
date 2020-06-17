import { RefundType } from "./refundType";

export class MerchantReturnPolicy {
    #returnPolicyID: string;
    #returnPolicyName:string;
    #inStoreReturnsOffered: boolean;
    #merchantReturnDays: number;
    #refundType: RefundType;

    constructor(returnPolicyID:string, returnPolicyName:string, inStoreReturnsOffered:boolean, merchantReturnDays:number, refundType:RefundType){
        this.#returnPolicyID=returnPolicyID;
        this.#returnPolicyName=returnPolicyName;
        this.#inStoreReturnsOffered=inStoreReturnsOffered;
        this.#merchantReturnDays=merchantReturnDays;
        this.#refundType = refundType;
    }
    
}