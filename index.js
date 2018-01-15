const express = require('express'),
    app = express(),
    db = require('./models/db'),
    router = require('./controllers'),
    authorization = require('./middlewares/authorization'),
    parser = require('body-parser'),
    cluster = require('cluster'),
    numCPUs = require("os").cpus().length;

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

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) { cluster.fork(); }
    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    app.listen(1337, () => {
        console.log(`Worker ${process.pid} listening on port 1337!`);
    });
}