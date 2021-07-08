const express = require('express');
const app = express();
const PORT = 6000;

const db = require('./config/mongoose');
app.use(express.urlencoded({extended: true}));
app.use('/', require('./routes/index'));




app.listen(6000, function(err){
    
    if(err){
        console.log("Error in starting server", err);
    }
    console.log(`Server up and running on PORT: ${PORT}`); 
});