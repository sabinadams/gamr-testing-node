const db = require('../models/db');
const base = require('./base-service');
module.exports = {
    getUser(req, res) {
        res.status(200).json({
            name: "Sabin",
            email: "test@gmail.com"
        });
    }
}