import './index.css'
import { createFirstUser } from './create-first-user'
import { login } from './login'
import { time } from './time'

function init() {
    fetch(window.location, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type: 'start' })
    }).then(response => response.json()).then(route)
}

export function route(data) {
    switch (data.type) {
        case 'create-first-user':
            createFirstUser(data.salt)
            break

        case 'login':
            login()
            break

        case 'login-fail':
            login(true)
            break

        case 'logged-in':
            time()
            break
    }
}

init()