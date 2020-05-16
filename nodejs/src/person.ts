import { Thing } from "./thing";
import { PostalAddress } from "./postaladdress";
import { Product } from "./product";
import { Country } from "./country";

export class Person extends Thing {
    #additionalName?:String;
    #address?:PostalAddress;
    #birthDate:Date;
    #email:String;
    #familyName:String;
    #gender:String; // either MALE or FEMALE or OTHER
    #givenName:String;
    #postalLocations?:Array<PostalAddress>;
    #owns?:Array<Product>;
    #nationality:Country;
    #ID?:String;
    #IDType?:String;
    #taxID?:String;
    #telephone?:String;
    constructor(email:String, givenName:String, familyName:String, nationality:Country, gender:String, birthDate:Date, additionalName?:String){
        super();
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
    setID(ID:String, IDType:String){
        this.#ID=ID;
        this.#IDType=IDType;
    }
    set taxID(taxID:String){
        this.#taxID=taxID;
    }
    set telephone(telephone:String){
        this.#telephone=telephone;
    }
    set address(address:PostalAddress){
        this.#address=address;
    }
}