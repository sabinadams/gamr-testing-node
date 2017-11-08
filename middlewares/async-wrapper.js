const base = require('../services/base-service');
// Wraps asyncronous code in a promise so we can catch any errors (good for routes)
// JavaScript is BAD about catching errors in an async state
module.exports = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(err => {
        base.handleServerError(req, res, err.message);
    });
};