import { Thing } from "./thing";

export class PostalAddress extends Thing {
    #addressCountry:String; //two-letter ISO 3166-1 alpha-2 country code
    #addressLocality:String; //The locality in which the street address is, and which is in the region
    #addressRegion:String; //ISO 3166-2 code
    #postOfficeBoxNumber?:String; //The post office box number for PO box addresses
    #postalCode:String; //For example, 94043, can include letters
    #streetAddress:String; //For example, 1600 Amphitheatre Pkwy
    constructor(country:String, locality:String, region:String, postalCode:String, streetAddress:String, postOfficeBoxNumber?:String){
        super();
        this.#addressCountry=country;
        this.#addressLocality=locality;
        this.#addressRegion=region;
        this.#postalCode=postalCode;
        this.#streetAddress=streetAddress;
        if(postOfficeBoxNumber){
            this.#postOfficeBoxNumber=postOfficeBoxNumber;
        }
    }
}