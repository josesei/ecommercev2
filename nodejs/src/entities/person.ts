import { PostalAddress } from "./postaladdress";
import { Product } from "./product";
import { Country } from "./country";

export class Person {
    #additionalName?:string;
    #address?:PostalAddress;
    #birthDate:Date;
    #email:string;
    #familyName:string;
    #gender:string; // either MALE or FEMALE or OTHER
    #givenName:string;
    #postalLocations?:Array<PostalAddress>;
    #owns?:Array<Product>;
    #nationality:Country;
    #ID?:string;
    #IDType?:string;
    #taxID?:string;
    #telephone?:string;
    constructor(email:string, givenName:string, familyName:string, nationality:Country, gender:string, birthDate:Date, additionalName?:string){
        this.#email=email;
        this.#givenName=givenName;
        this.#familyName=familyName;
        this.#nationality=nationality;
        this.#gender=gender;
        this.#birthDate=birthDate;
        this.#nationality=nationality;
        if(additionalName){
            this.#additionalName=additionalName;
        }
        
    }

    set postalLocations(postalLocations:Array<PostalAddress>){
        this.#postalLocations=postalLocations;
    }
    addPostalLocation(postalLocation:PostalAddress){
        if(this.#postalLocations && this.#postalLocations==[]){
            this.#postalLocations.push(postalLocation);
        }   
    }
    setID(ID:string, IDType:string){
        this.#ID=ID;
        this.#IDType=IDType;
    }
    set taxID(taxID:string){
        this.#taxID=taxID;
    }
    set telephone(telephone:string){
        this.#telephone=telephone;
    }
    set address(address:PostalAddress){
        this.#address=address;
    }
}