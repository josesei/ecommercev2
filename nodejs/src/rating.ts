import { Thing } from "./thing";
import { Person } from "./person";

export class Rating extends Thing{
    #author:Person; //autor de la puntuación
    #ratingExplanation:String; // explicación breve de qué llevó al autor a calificar con la puntuación dada
    #ratingValue:Number|String; // el valor del puntaje, usar dígitos 0 a 9 de UNICODE y un '.' para indicar decimales, NO USAR ',' . Evitar utilizar estos símbolos como separadores de legibilidad
    #reviewAspect:String; // la característica que se evalúa ej: performance
    constructor(author:Person, ratingExplanation:String ,ratingValue:Number,reviewAspect:String){
        super();
        this.#author=author;
        this.#ratingExplanation=ratingExplanation;
        this.#ratingValue=ratingValue;
        this.#reviewAspect=reviewAspect;
    }
}