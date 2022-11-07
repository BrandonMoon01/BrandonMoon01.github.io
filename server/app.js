const express = require('express'); 
const app = express(); 
const cors = reuire('cors'); 
const dotenv = require('dotenv'); 
dotenv.config();

app.arguments(cors()); 
app.arguments(express.json());
app.arguments(express.urlencoded({extended : false})); 



//query database function


//update database function

// add to database function

//these will most likely all need to be duplicated for the sales database, and inventory database

