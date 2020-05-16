import { Session } from "./session";
import { Person } from "./person"
import { Country } from "./country";

export class User extends Person{
    #UID:String; //System's own User ID, can be the e-mail
    #password:String; //Hashed password
    #registrationDate:String;
    #sessions:Array<Session>;

    constructor(email:String, givenName:String, familyName:String, nationality:Country, gender:String, birthDate:Date, password:String, registrationDate:String, additionalName:String){
        super(email,givenName,familyName,nationality,gender,birthDate,additionalName);
        this.#UID=email;
        this.#password=password;
        this.#registrationDate=registrationDate;
        this.#sessions=[]; // CHANGE!!!! NEEDS IMPLEMENTATION
    }
    
}