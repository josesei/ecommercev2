import { Schema, Document, Types } from "mongoose";
import { IShoppingCart } from "./shoppingCart";
import { ICountry } from "./country";
import { IOrder } from "./order";
import { IRegion } from "./region";
import { ILocality } from "./locality";
import { IPostalAddress } from "./postalAddress";
import { ProcessEnvOptions } from "child_process";
const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcrypt");

enum Gender {
    FEMALE = "FEMALE",
    MALE = "MALE",
    OTHER = "OTHER"
}

export interface ISession extends Document {
    token: string,
    expiresAt: number
}

export interface IUser extends Document {
    email: string,
    password: string,
    session: Types.Array<ISession["_id"]>,
    isVerified: Boolean,
    givenName: string,
    familyName: string,
    savedCart: Types.Array<IShoppingCart["_id"]>,
    order: Types.Array<IOrder["_id"]>,
    address: Types.Array<IPostalAddress["_id"]>,
    nationality?: ICountry["_id"],
    gender?: Gender,
    birthDate?: Date
}

const UserSchema = new Schema({
    email: {type:String, required: true, minlength: 5, trim: true, unique:true},
    password: {type: String, required: true, trim: true},
    session:[
        {
            token:{type: String},
            expiresAt:{type: Date}
        }
    ],
    isVerified: { type: Boolean, default: false },
    givenName: {type: String, required: true},
    familyName: {type:String, required: true},
    nationality: {type:Schema.Types.ObjectId, ref: 'Country', required: false},
    gender: {type:Gender, required: false},
    birthDate: {type:Date, required:false},
    savedCart: [
        {type:Schema.Types.ObjectId, ref: 'ShoppingCart'}
    ],
    order: [
        {type:Schema.Types.ObjectId, ref: 'Order'}
    ],
    postalAddress: [
        {type:Schema.Types.ObjectId, ref: 'PostalAddress'}
    ]  
}, {
    timestamps: true,
   });



// MIDDLEWARE
// Before a user document is saved, encrypt the password
UserSchema.pre<IUser>('save', function (next) {
    let user = this;
    if (user.isModified('password')) {
        // if the password field has been edited/changed then run this code.

        // Generate salt and hash password
        bcrypt.genSalt(Number(process.env.COST_FACTOR), (err:any, salt:any) => {
            bcrypt.hash(user.password, salt, (err:any, hash:any) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
});



UserSchema.methods.toJSON = function () {
    // return the document except the password and sessions (these shouldn't be made available)
    // ADDITIONAL FIELDS CAN BE OMITTED
    return _.omit(this.toObject(), ['password', 'session', '__v']);
}

export const User = mongoose.model('User', UserSchema);