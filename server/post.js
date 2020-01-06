const start = require('./start')
const user = require('./user')

module.exports = function post(req, res) {
    if (req.body.type === 'start') {
        start(req, res)
    } else if (req.body.type === 'first-user') {
        user.create(req, res)
    } else if (req.body.type === 'login') {
        user.login(req, res)
    }
}