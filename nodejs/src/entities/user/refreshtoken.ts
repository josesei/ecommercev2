//LONG-LIVED TOKEN STORED IN THE DB AND in httpOnly cookies in the client side
export class RefreshToken {
    #expiresIn: number;
    #token: string;
    constructor(expiresIn:number, token:string){
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