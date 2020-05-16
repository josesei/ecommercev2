import {Thing} from "./thing";

//schema.org/product
export class Product extends Thing{
    #additionalProperty:any;
    #aggregateRating:any;
    #audience:any;
    #award:any
    #brand:any;
    #category:any;
    #color:any;
    #depth:any;
    #gtin:any;
    #hasMerchantReturnPolicy:any;
    #heigth:any;
    #isAccessoryOrSparePartFor:any;
    #isConsumableFor:any;
    #isRelatedTo:any;
    #isSimilarTo:any;
    #itemCondition:any;
    #logo:any;
    #manufacturer:any;
    #material:any;
    #model:any;
    #mpn:any;
    #offers:any;
    #productID:any;
    #releaseDate:any;
    #review:any;
    #sku:any;
    #slogan:any;
    #weigth:any;
    #width:any;
    get productID(){
        return this.#productID;
    }
    set productID(id:String) {
        this.#productID = id;
    }
}