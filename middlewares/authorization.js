// Unprotected routes
let whitelist = [
    '/route'
];

module.exports = (req, res, next) => {
    next();
};