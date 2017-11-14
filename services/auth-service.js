const db = require("../models/db"),
    base = require('./base-service'),
    security = require('../util/security');

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
    },
    login(req, res) {
        let form = req.body;
        if (form.email == "" || form.password == "" || form.email == null || form.password == null) {
            return res.status(400).json({
                message: "Not all the required forms were filled out."
            });
        }
        db.users.findOne({ where: { email: form.email } }).then(user => {
            if (user && user.active) {
                if (user.password == security._createHash(`${form.password}${user.salt}`)) {
                    let token = security._generateToken();
                    db.sessions.create({
                        user_ID: user.ID,
                        token
                    }).then(() => {
                        res.status(200).json({
                            email: user.email,
                            token: token,
                            active: user.active,
                            security_level: user.security_level,
                            display_name: user.display_name,
                            tag: user.tag,
                            bio: user.bio,
                            profile_pic: user.profile_pic,
                            banner_pic: user.banner_pic,
                            exp_count: user.exp_count,
                            level: user.level,
                        });
                    })
                } else {
                    res.status(401).json({
                        message: 'Email or password was incorrect'
                    });
                }
            } else {
                res.status(400).json({
                    message: user ?
                        'Your account was deactivated. Please contact support with further questions.' : 'Email or password was incorrect'
                });
            }
        });

    }
};