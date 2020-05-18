
const express = require("express");
const productRouter = express.Router()


productRouter.get("/product/:id", (req:any, res:any)=>{

    res.end();
});

module.exports = productRouter;