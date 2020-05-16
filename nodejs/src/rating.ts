import { Thing } from "./thing";

export class Rating extends Thing{
    #author:Person; //autor de la puntuación
    #bestRating:Number|String; // valor más alto permitido para calificar (ej: 5)
    #ratingExplanation:String; // explicación breve de qué llevó al autor a calificar con la puntuación dada
    #ratingValue:Number|String; // el valor del puntaje, usar dígitos 0 a 9 de UNICODE y un '.' para indicar decimales, NO USAR ',' . Evitar utilizar estos símbolos como separadores de legibilidad
    #reviewAspect:String; // la característica que se evalúa ej: performance
    #worstRating:Number|String; // valor más bajo permitido para calificar (ej: 0)
}