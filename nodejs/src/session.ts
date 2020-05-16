import { RefreshToken } from "./refreshtoken";
import { AccessToken } from "./accessToken";

export class Session{
    #refreshToken?:Array<RefreshToken>;
    #accessToken?:Array<AccessToken>;
    constructor(refreshToken?:Array<RefreshToken>){
        if(refreshToken){
            this.#refreshToken=refreshToken;
        } 
    }
}