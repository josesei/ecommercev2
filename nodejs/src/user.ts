import { Session } from "./session";
import { Person } from "./person"
import { Country } from "./country";

export class User extends Person{
    #UID:string; //System's own User ID, can be the e-mail
    #password:string; //Hashed password
    #registrationDate:Date;
    #sessions:Array<Session>;

    constructor(email:string, givenName:string, familyName:string, nationality:Country, gender:string, birthDate:Date, password:string, registrationDate:Date, additionalName:string){
        super(email,givenName,familyName,nationality,gender,birthDate,additionalName);
        this.#UID=email;
        this.#password=password;
        this.#registrationDate=registrationDate;
        this.#sessions=[]; // CHANGE!!!! NEEDS IMPLEMENTATION
    }
    
}