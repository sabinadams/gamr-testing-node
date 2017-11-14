const express = require("express"),
    router = express.Router(),
    _authService = require('../services/auth-service'),
    asyncWrapper = require('../middlewares/async-wrapper');

router.post('/login', asyncWrapper(_authService.login));

module.exports = router;