const luxon = require('luxon')
const db = require('./db')

// the week (Monday to Sunday) around req.body.time, one entry per day, matching client/time.js
async function get(req, res) {
    const date = luxon.DateTime.fromMillis(req.body.time)
    const start = date.startOf('week')
    const end = start.plus({ weeks: 1 })
    const results = await db.all(
        'SELECT id, clientId, start, end, date, duration, description FROM time WHERE userId=? AND start >= ? AND start < ?',
        [req.session.userId, start.toMillis(), end.toMillis()]
    )
    const data = []
    for (let i = 0; i < 7; i++) {
        data.push({ time: 0, entries: [] })
    }
    for (const entry of results) {
        const day = data[luxon.DateTime.fromMillis(entry.start).weekday - 1]
        day.time += entry.duration || 0
        day.entries.push(entry)
    }
    res.send(JSON.stringify(data))
}

module.exports = {
    get
}
