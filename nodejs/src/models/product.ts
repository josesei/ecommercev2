import { Document, Types } from "mongoose";    
import { ItemCondition } from "../entities/product/itemCondition";
import { IBrand } from "./brand";
import { IDistance } from "./distance";
import { IWeight } from "./weight";
import { IProductCategory } from "./productCategory";
import { IAudience } from "./audience";

export interface IProduct extends Document {
    audience: IAudience["_id"],
    brand: IBrand["_id"],
    category: IProductCategory["_id"],
    depth: IDistance["_id"],
    heigth: IDistance["_id"],
    images: Types.Array<string>,
    itemCondition: ItemCondition,
    name:string,
    weigth: IWeight["_id"],
    width: IDistance["_id"],
    relatedProducts: IProduct["_id"]
}