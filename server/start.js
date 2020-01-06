const db = require('./db')
const settings = require('../settings.json')

module.exports = async function start(req, res) {
    const count = await db.get('SELECT COUNT(*) as count FROM users')
    if (count.count === 0) {
        res.send({ type: 'create-first-user' })
    } else {
        if (settings.forceLogin) {
            req.session.userId = settings.forceLogin
            res.send({ type: 'logged-in' })
        } else {
            res.send({ type: 'login' })
        }
    }
}