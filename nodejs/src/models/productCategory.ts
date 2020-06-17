import { Document } from "mongoose";

export interface IProductCategory extends Document {
    productCategoryName: string
}