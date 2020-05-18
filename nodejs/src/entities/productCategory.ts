export class ProductCategory {
    #productCategoryID:string;
    #productCategoryName:string;

    constructor(productCategoryID:string, productCategoryName:string){
        this.#productCategoryID=productCategoryID;
        this.#productCategoryName=productCategoryName;
    }
}