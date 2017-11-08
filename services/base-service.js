const db = require("../models/db");
module.exports = {
    // Sends a default server error message
    handleServerError(res) {
        return res.status(500).json({ message: 'Server Error!!' });
    },
    // Sends an unauthorized error
    handleAuthError(res, message) {
        return res.status(401).json({ message: message ? message : 'Not Authorized!' });
    }
};