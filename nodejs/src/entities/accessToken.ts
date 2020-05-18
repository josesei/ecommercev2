//short lived token, MUST NOT BE STORED IN THE DB
export class AccessToken{
    #expiresIn: number;
    #token: string; //NOT STORED IN DB, stored dynamically in the backend and in httpOnly cookies in the clientside
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