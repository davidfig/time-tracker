const crypto = require('crypto')
const db = require('./db')

async function create(req, res) {
    // for now, make sure there are no other users
    const count = await db.get('SELECT COUNT(*) as count FROM users')
    if (count.count === 0) {
        const length = 256
        const salt = crypto.randomBytes(length / 2).toString('hex').slice(0, length)
        const hash = crypto.createHmac('sha512', salt)
        hash.update(req.body.password)
        const value = hash.digest('hex')
        await db.run('INSERT INTO USERS (name, salt, password) VALUES (?,?,?)', [req.body.user, salt, value])
        req.session.userId = db.getLastId()
        res.send(JSON.stringify({ type: 'logged-in' }))
    }
}

async function login(req, res) {
    const user = await db.get('SELECT salt, password FROM users WHERE name=?', [req.body.user])
    if (user) {
        const hash = crypto.createHmac('sha512', user.salt)
        hash.update(req.body.password)
        if (hash.digest('hex') === user.password) {
            res.send(JSON.stringify({ type: 'logged-in' }))
        } else {
            res.send(JSON.stringify({ type: 'login-fail'}))
        }
    } else {
        res.send(JSON.stringify({ type: 'login-fail' }))
    }
}

module.exports = {
    create,
    login
}