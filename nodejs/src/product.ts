import { Review } from "./review";
import { AggregateRating } from "./aggregateRating";
import { Weight } from "./weight"
import { Distance } from "./distance";

//schema.org/product
export class Product {
    #aggregateRating:AggregateRating;
    #audience:Audience;
    #award:string;
    #brand:Brand;
    #category:ProductCategory;
    #color:string;
    #depth:Distance;
    #gtin:string;
    #hasMerchantReturnPolicy:MerchantReturnPolicy;
    #heigth:Distance;
    #isAccessoryOrSparePartFor:string;
    #isConsumableFor:string;
    #isRelatedTo:string;
    #isSimilarTo:string;
    #itemCondition:CondicionProducto;
    #manufacturer:Manufacturer;
    #material:string;
    #model:ProductModel;
    #mpn:string;
    #name:string;
    #productID:string;
    #releaseDate:Date;
    #review:Array<Review>;
    #sku:string;
    #slogan:string;
    #weigth:Weight;
    #width:Distance;


    constructor(){
        
    }


    get productID(){
        return this.#productID;
    }
    get name(){
        return this.#name;
    }
    set productID(id:string) {
        this.#productID = id;
    }
}