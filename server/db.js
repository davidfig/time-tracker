const sqlite3 = require('sqlite3')
const database = require('../settings').database

let _db, _lastId

function init() {
    return new Promise((resolve, reject) => {
        _db = new sqlite3.Database(database, (err, response) => {
            if (err) {
                reject(err)
            } else {
                resolve(response)
            }
        })
    })
}

async function createIfNeeded() {
    await run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        salt TEXT,
        password TEXT)`)
    await run(`CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        name TEXT
    )`)
    await run(`CREAT TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        teamId INTEGER,
        name TEXT
    )`)
    await run(`CREATE TABLE IF NOT EXISTS time (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        clientId INTEGER,
        start INTEGER ,
        end INTEGER,
        date INTEGER,
        duration INTEGER,
        description TEXT
    )`)
}

function get(query, values) {
    return new Promise((resolve, reject) => {
        _db.get(query, values, function(err, response) {
            if (err) {
                reject(err)
            } else {
                _lastId = this.lastID
                resolve(response)
            }
        })
    })
}

function getLastId() {
    return _lastId
}

function run(query, values) {
    return new Promise((resolve, reject) => {
        _db.run(query, values, function (err, response) {
            if (err) {
                reject(err)
            } else {
                _lastId = this.lastID
                resolve(response)
            }
        })
    })
}

function all(query, values) {
    return new Promise((resolve, reject) => {
        _db.all(query, values, function (err, response) {
            if (err) {
                reject(err)
            } else {
                resolve(response)
            }
        })
    })
}

module.exports = {
    init,
    createIfNeeded,
    get,
    run,
    all,
    getLastId
}