const express = require('express');
const app = express();
const port = 8000;

//Use express router

app.use('/',require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log('Error',err)
    }

    console.log('Server is running on',port)
})