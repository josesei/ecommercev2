import { Thing } from "./thing";
import { Rating } from "./rating";

export class Review extends Thing {
    #itemReviewed:Thing; // lo que se evalúa
    #reviewAspect:String; // aspecto que se evalúa en la reseña ej: performance
    #reviewBody:String; // cuerpo de la reseña
    #reviewRating:Rating; // rating asociado a la reseña
    //SEGUIR AGREGANDO
    constructor(itemReviewed:Thing, reviewAspect:String, reviewBody: String, reviewRating:Rating){
        super();
        this.#itemReviewed=itemReviewed;
        this.#reviewAspect=reviewAspect;
        this.#reviewBody=reviewBody;
        this.#reviewRating=reviewRating;
    }


}