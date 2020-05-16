//LONG-LIVED TOKEN STORED IN THE DB AND in httpOnly cookies in the client side
export class RefreshToken {
    #expiresIn: Number;
    #token: String;
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