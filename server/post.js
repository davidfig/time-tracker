const start = require('./start')
const user = require('./user')
const time = require('./time')

module.exports = function post(req, res) {
    if (req.body.type === 'start') {
        start(req, res)
    } else if (req.body.type === 'first-user') {
        user.create(req, res)
    } else if (req.body.type === 'login') {
        user.login(req, res)
    }

    if (req.session.userId) {
        if (req.body.type === 'get-time') {
            time.get(req, res)
        }
    }
}