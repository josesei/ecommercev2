import { Person } from "./person";

export class Rating {
    #author?:Person; //autor de la puntuación
    #ratingExplanation?:string; // explicación breve de qué llevó al autor a calificar con la puntuación dada
    #ratingValue:number; // el valor del puntaje, usar dígitos 0 a 9 de UNICODE y un '.' para indicar decimales, NO USAR ',' . Evitar utilizar estos símbolos como separadores de legibilidad
    #reviewAspect?:string; // la característica que se evalúa ej: performance

    constructor(ratingValue:number,reviewAspect?:string, author?:Person, ratingExplanation?:string){     
        this.#ratingValue=ratingValue;
        if(reviewAspect){
            this.#reviewAspect=reviewAspect;
        }        
        if(author){
            this.#author=author;
        }
        if(ratingExplanation){
            this.#ratingExplanation=ratingExplanation;
        }
    }

    get ratingValue(){
        return this.#ratingValue;
    }

}