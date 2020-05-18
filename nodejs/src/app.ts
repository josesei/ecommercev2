import {} from "./entities/product";
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const productionUrl = "";
const developmentUrl = "http://localhost";

//DB CONNECTION
mongoose.connect("mongodb://localhost:27017/ecommercev2", {useNewUrlParser: true}, (err:any)=>{
    if(err) {
        console.error("Could not connect to MongoDB");
    }
    else{
        console.log("Connected to MongoDB")
    }
});



//GENERAL FORMATTING
app.use(bodyParser.urlencoded({
    extended: true
}),
bodyParser.json());


//ROUTES
app.use(require("./routes/productRoute"));


//SERVER CONFIG
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listening on port ${port}...`);
})




