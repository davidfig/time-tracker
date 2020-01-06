const luxon = require('luxon')
const db = require('./db')

async function get(req, res) {
    const date = luxon.DateTime.fromMillis(req.body.time)
    start = date.minus({ days: date.weekday }).toMillis()
    end = date.plus({ days: 7 - date.weekday }).toMillis()
    const results = await db.all('SELECT id, client, start, end, date, duration, description FROM time WHERE user=? AND start >= ? AND end <= ?', [req.session.userId, start, end])
    let data = []
    for (let i = 0; i < 7; i++) {
        data.push({ time: 0, entries: [] })
    }
    for (let date of results) {

    }
    res.send(JSON.stringify(data))
}

module.exports = {
    get
}