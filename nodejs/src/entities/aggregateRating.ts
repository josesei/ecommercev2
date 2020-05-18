import { Rating } from "./rating";
import { Product } from "./product";
import { Review } from "./review";

export class AggregateRating extends Rating {
    #itemReviewed:Product;
    //The constructor MUST RECEIVE a NOT NULL Array of size > 0
    constructor(itemReviewed:Product, reviews:Array<Review>){
        super(AggregateRating.obtainOverallRating(reviews), "General", undefined, "Los usuarios que compraron "+itemReviewed.name+ " le otorgaron esta calificación en promedio");
        this.#itemReviewed=itemReviewed;
    }

    static obtainReviewCount(reviews:Array<Review>){
        let reviewCount=0;
        for(let i=0;i<reviews.length;i++){
            if(reviews[i].reviewBody && reviews[i].reviewBody!=""){
                ++reviewCount;
            }
        }
        return reviewCount;
    }
    static obtainOverallRating(reviews:Array<Review>){
        let ratingsCount=reviews.length;
        let acumRatings=0;
        for(let i=0;i<reviews.length;i++){
            acumRatings+=reviews[i].reviewRating.ratingValue;
        }
        return acumRatings/ratingsCount;
    }

}