import { Review } from "./review";
import { AggregateRating } from "./aggregateRating";
import { Weight } from "./weight"
import { Distance } from "./distance";
import { Audience } from "./audience";
import { ItemCondition } from "./itemCondition";
import { Brand } from "./brand";
import { ProductCategory } from "./productCategory";
import { MerchantReturnPolicy } from "./merchantReturnPolicy";

//schema.org/product
export class Product {
    #aggregateRating?:AggregateRating;
    #audience:Audience;
    #award?:string;
    #brand:Brand;
    #category:ProductCategory;
    #color?:string;
    #depth:Distance;
    #gtin?:string;
    #hasMerchantReturnPolicy?:MerchantReturnPolicy;
    #heigth:Distance;
    #images:Array<string>
    #isAccessoryOrSparePartFor?:Array<Product>;
    #isConsumableFor?:Array<Product>;
    #isRelatedTo?:Array<Product>;
    #isSimilarTo?:Array<Product>;
    #itemCondition:ItemCondition;
    #material?:string;
    #mpn?:string;
    #name:string;
    #productID:string;
    #releaseDate?:Date;
    #review?:Array<Review>;
    #sku?:string;
    #slogan?:string;
    #weigth:Weight;
    #width:Distance;


    constructor(audience:Audience, brand:Brand, category:ProductCategory, depth:Distance, heigth:Distance, width:Distance, weigth:Weight,
         images:Array<string>, itemCondition:ItemCondition, name:string, productID:string, aggregateRating?:AggregateRating, award?:string, 
         color?:string, gtin?:string, hasMerchantReturnPolicy?:MerchantReturnPolicy, isAccesoryOrSparePartFor?:Array<Product>, 
         isConsumableFor?:Array<Product>, isRelatedTo?:Array<Product>, isSimilarTo?:Array<Product>, material?:string, mpn?:string, releaseDate?:Date, 
         review?:Array<Review>, sku?:string, slogan?:string ) 
    {
        this.#audience=audience;
        this.#brand=brand;
        this.#category=category;
        this.#depth=depth;
        this.#heigth=heigth;
        this.#width=width;
        this.#weigth=weigth;
        this.#images=images;
        this.#itemCondition=itemCondition;
        this.#name=name;
        this.#productID=productID;
        this.#aggregateRating=aggregateRating;
        this.#award=award;
        this.#color=color;
        this.#gtin=gtin;
        this.#hasMerchantReturnPolicy=hasMerchantReturnPolicy;
        this.#isAccessoryOrSparePartFor=isAccesoryOrSparePartFor;
        this.#isConsumableFor=isConsumableFor;
        this.#isRelatedTo=isRelatedTo;
        this.#isSimilarTo=isSimilarTo;
        this.#material=material;
        this.#mpn=mpn;
        this.#releaseDate=releaseDate;
        this.#review=review;
        this.#sku=sku;
        this.#slogan=slogan;
        
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