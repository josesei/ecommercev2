
export class PostalAddress {
    #addressCountry:string; //two-letter ISO 3166-1 alpha-2 country code
    #addressLocality:string; //The locality in which the street address is, and which is in the region
    #addressRegion:string; //ISO 3166-2 code
    #postOfficeBoxNumber?:string; //The post office box number for PO box addresses
    #postalCode:string; //For example, 94043, can include letters
    #streetAddress:string; //For example, 1600 Amphitheatre Pkwy
    constructor(country:string, locality:string, region:string, postalCode:string, streetAddress:string, postOfficeBoxNumber?:string){
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