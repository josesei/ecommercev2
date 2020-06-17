const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { Client } = require('@elastic/elasticsearch');
const cors = require('cors');
const csrf = require('csurf');
require("dotenv").config({ path: '../.env' });

export const express = require("express");
const app = express();

const productionUrl = "";
const developmentUrl = "http://localhost";

//APP-LEVEL MIDDLEWARE
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true 
};

app.use(cors(corsOptions));
app.use(cookieParser());

const csrfProtection = csrf({
    cookie: true
  });


//THE FOLLOWING GET ROUTE IS NOT MIDDLEWARE BUT PART OF THE CRSF PROTECTION, WHEN THE CLIENT FIRST STARTS USING THE APP
//IT REQUESTS A NEW TOKEN AND THEN USES IT IN EVERY PUT/POST/DELETE/PATCH REQUEST

app.get('/csrf-token', (req:any, res:any) => {
   res.json({ csrfToken: req.csrfToken() });
  });

//MIDDLEWARE END

//ELASTICSEARCH DB CONNECTION
export const client = new Client({ node: 'http://localhost:9200' });
//CHECK IF DB IS UP
client.ping(
    {},
    {requestTimeout: 30000}
    , function(error:any) {
    if (error) 
    {
        console.error('[ERROR] ElasticSearch is down!');
    } else 
    {
        console.log('[SUCCESS] ElasticSearch is up!');
    }
});


//MONGODB CONNECTION
mongoose.connect(process.env.DB_MONGO_SERVER, {useNewUrlParser: true}, (err:any)=>{
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
}));
app.use(bodyParser.json());


//ROUTES
app.use(require("./routes/userRoute"));
app.use(require("./routes/productRoute"));



//SERVER CONFIG
app.listen(process.env.PORT, ()=>{
    console.log(process.env.PORT)
    console.log("[SUCCESS] Server UP: Listening on port " + process.env.PORT + " ...");
});




