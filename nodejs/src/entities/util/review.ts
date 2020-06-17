import { Rating } from "./rating";
import { Product } from "../product/product";

export class Review {
    #reviewAspect:string; // aspecto que se evalúa en la reseña ej: performance
    #reviewBody:string; // cuerpo de la reseña
    #reviewRating:Rating; // rating asociado a la reseña
    //SEGUIR AGREGANDO
    constructor(reviewAspect:string, reviewBody: string, reviewRating:Rating){
        this.#reviewAspect=reviewAspect;
        this.#reviewBody=reviewBody;
        this.#reviewRating=reviewRating;
    }

    get reviewBody(){
        return this.#reviewBody;
    }

    get reviewRating(){
        return this.#reviewRating;
    }


}