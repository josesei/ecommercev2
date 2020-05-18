import {} from "./entities/product";
const bodyParser = require("body-parser");

const express = require("express");
const app = express();

const productionUrl = "";
const developmentUrl = "http://localhost";

//DB CONNECTION




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




