const crypto = require('crypto');

// Generates UUID for tokens
function _generateToken() {
    let d = new Date().getTime();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        const r = ((d + Math.random() * 16) % 16) | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x7) | 0x8).toString(16);
    });
}

// Hashes strings to md5 Hexes
function _createHash(data) {
    return crypto.createHash("md5").update(data).digest("hex");
}

module.exports = { _generateToken, _createHash };