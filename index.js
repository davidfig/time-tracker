const express = require('express')
const session = require('express-session')
const randomString = require('crypto-random-string')
const bodyParser = require('body-parser')
const parcel = require('./server/parcel')
const path = require('path')
const db = require('./server/db')
const post = require('./server/post')
const app = express()

const secret = randomString({ length: 20 })

async function init() {

    app.use(bodyParser.json({ extended: true }))
    app.use(session({
        secret,
        resave: true,
        saveUninitialized: true
    }))
    const port = require('./settings.json').port

    app.use(express.static(path.join(__dirname, 'dist')))
    app.post('/', post)

    await db.init()
    await db.createIfNeeded()

    parcel()

    const server = app.listen(port, () => console.log(`🕒 davidfig/time-tracker listening at https://localhost:${port}`))
    server.keepAliveTimeout = 0
}

init()