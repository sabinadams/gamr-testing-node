const db = require('../models/db');
const base = require('./base-service');
module.exports = {
    getUser(req, res) {
        db.users
            .findOne({ where: { email: "sabintheworld@gmail.com" } })
            .then(user => { res.status(200).json(user); });
    }
}