import {Thing} from "./thing";
import { Review } from "./review";

//schema.org/product
export class Product extends Thing{
    #aggregateRating:AggregateRating;
    #audience:Audience;
    #award:String;
    #brand:Brand;
    #category:ProductCategory;
    #color:String;
    #depth:Distance;
    #gtin:String;
    #hasMerchantReturnPolicy:MerchantReturnPolicy;
    #heigth:Distance;
    #isAccessoryOrSparePartFor:String;
    #isConsumableFor:String;
    #isRelatedTo:String;
    #isSimilarTo:String;
    #itemCondition:CondicionProducto;
    #logo:String;
    #manufacturer:Manufacturer;
    #material:String;
    #model:ProductModel;
    #mpn:String;
    #productID:String;
    #releaseDate:Date;
    #review:Array<Review>;
    #sku:String;
    #slogan:String;
    #weigth:QuantitativeValue;
    #width:Distance;
    get productID(){
        return this.#productID;
    }
    set productID(id:String) {
        this.#productID = id;
    }
}