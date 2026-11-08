const start = require('./start')
const user = require('./user')
const time = require('./time')

module.exports = async function post(req, res) {
    const type = req.body?.type
    try {
        if (type === 'start') {
            await start(req, res)
        } else if (type === 'first-user') {
            await user.create(req, res)
        } else if (type === 'login') {
            await user.login(req, res)
        } else if (req.session.userId && type === 'get-time') {
            await time.get(req, res)
        } else {
            // not logged in, or an unknown request: answer instead of leaving the request hanging
            res.status(401).send(JSON.stringify({ type: 'login' }))
        }
    } catch (e) {
        // a failed request shouldn't stop the server
        console.error(`Error handling ${type}:`, e)
        if (!res.headersSent) {
            res.status(500).send(JSON.stringify({ type: 'error' }))
        }
    }
}
