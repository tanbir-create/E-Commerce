const express = require('express');
const app = express();
const PORT = process.env.PORT || 6000;
const cors = require('cors');
const env = require('dotenv');
env.config();

// const passportJWT = require('./config/passport-jwt-strategy');
const db = require('./config/mongoose');



app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(cors());
//routes
app.use('/', require('./api/routes/index'));

app.listen(PORT, function(err){
    
    if(err){
        console.log("Error in starting server", err);
    }
    console.log(`Server up and running on PORT: ${PORT}`); 
});