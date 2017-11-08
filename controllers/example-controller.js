const express = require("express"),
    router = express.Router(),
    _exampleService = require('../services/example-service'),
    asyncWrapper = require('../middlewares/async-wrapper');

router.get("/getuser", asyncWrapper(_exampleService.getUser));

module.exports = router;