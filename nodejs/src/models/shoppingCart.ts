import { Schema, Document, Types } from "mongoose";
import { IProduct } from "./product";
const mongoose = require("mongoose");



interface ShoppingCartElement extends Document {
    product: IProduct['_id'],
    quantity: number
}

export interface IShoppingCart extends Document{
    shoppingCartElement: Types.Array<ShoppingCartElement>,
    coupon: string
}

const ShoppingCartSchema = new Schema({
    products: [
        {type: Types.ObjectId, ref:'Product'}, //REF TO PRODUCT
        {type: Number} //QUANTITY SELECTED
    ],
    coupon: {type: String}
});


const User = mongoose.model('ShoppingCart', ShoppingCartSchema);

module.exports = User;