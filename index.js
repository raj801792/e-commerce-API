const express = require('express');
const db = require('./configt/mongoose');
const app = express();
const port = 8000;

app.use(express.urlencoded());
app.use(express.json());


// use express router
app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});