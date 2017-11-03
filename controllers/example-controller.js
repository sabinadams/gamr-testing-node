const express = require("express"),
    router = express.Router(),
    _exampleService = require('../services/example-service');

router.get("/getuser", _exampleService.getUser);

module.exports = router;