module.exports = {
    getUser(req, res) {
        res.status(200).json({
            name: 'Sabin',
            email: 'test@gmail.com'
        });
    }
}