const _authService = require('../services/auth-service'),
    base = require('../services/base-service');
// Unprotected routes
const whitelist = [
    '/route'
];

module.exports = (req, res, next) => {
    // Allow all OPTIONS requests
    if (req.method == "OPTIONS") return res.status(200).json({
        message: "Preflight check successful"
    });

    // If the route is unprotected, go for it!
    if (whitelist.indexOf(req.url) != -1) return next();

    // If the token existed, get the UUID
    if (req.headers.authorization) {
        token = req.headers.authorization.split("Bearer ")[1];
    } else {
        // Otherwise the user isn't authorized
        return base.handleAuthError(res);
    }

    _authService.validateSession(res, token, session => {
        if (session.exists) {
            if (!session.user.active) return base.handleAuthError(res, "You account is deactivated.");
            req.user = session.user || [];
            req.user.token = token;
            return next();
        } else {
            return base.handleAuthError(res);
        }
    });

};