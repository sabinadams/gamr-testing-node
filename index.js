const express = require('express'),
    app = express(),
    db = require('./models/db'),
    router = require('./controllers'),
    authorization = require('./middlewares/authorization'),
    parser = require('body-parser');


// Parsing request/response data
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

//CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// Application-level middleware
app.use(authorization);

// Route Initialization
app.use(router);

// Specifies which port to run the server on.
app.listen(1337, () => {
    console.log('Example app listening on port 1337!');
});