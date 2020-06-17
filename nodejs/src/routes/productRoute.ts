import { client} from "../app";
export {};
const express = require('express');
const productRouter = express.Router();

productRouter.post("/product", (req:any, res:any)=>{

});

productRouter.get("/product/:id", (req:any, res:any)=>{
    client.get({
        index: 'product',
        id: req.params.id
      }, (err:any, result:any) => {
        if (err){
            console.log(err);
            res.status(500).send("ERROR");
        } 
        else{
            let product = result.body._source;
            if(product){
                product.
                console.log(product);
                res.status(200).send(product);                
            }
            else{
                console.log(product);
                res.status(404).send("NOT_FOUND")
            }
        }
      })
});




module.exports = productRouter;