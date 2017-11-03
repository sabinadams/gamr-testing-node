module.exports = {
    getUser(req, res) {
        res.status(200).json({
            name: 'Test',
            email: 'test@gmail.com'
        });
    }
}