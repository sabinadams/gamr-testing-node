const db = require("../models/db"),
    base = require('./base-service');

module.exports = {
    async validateSession(res, token, cb) {
        try {
            let session = await db.sessions.findOne({
                where: { token },
                include: { association: 'user' }
            });
            cb(session ? { exists: true, user: session.toJSON().user } : { exists: false, user: [] });
        } catch (err) {
            return base.handleServerError(res);
        }
    }
};