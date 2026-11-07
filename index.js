const express = require('express')
const session = require('express-session')
const crypto = require('crypto')
const parcel = require('./server/parcel')
const path = require('path')
const db = require('./server/db')
const post = require('./server/post')
const app = express()

const secret = crypto.randomBytes(20).toString('hex')

async function init() {

    app.use(express.json())
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

    await parcel()

    const server = app.listen(port, () => console.log(`🕒 davidfig/time-tracker listening at https://localhost:${port}`))
    server.keepAliveTimeout = 0
}

init()