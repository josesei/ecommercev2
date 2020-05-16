//short lived token, MUST NOT BE STORED IN THE DB
export class AccessToken{
    #expiresIn: Number;
    #token: String; //NOT STORED IN DB, stored dynamically in the backend and in httpOnly cookies in the clientside
    constructor(expiresIn:Number, token:String){
        this.#expiresIn=expiresIn;
        this.#token=token;
    }
    get token(){
        return this.#token;
    }
    get expiresIn(){
        return this.#expiresIn;
    }
}