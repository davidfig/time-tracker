import { clicked } from 'clicked'
import './create-first-user.css'
import { el, listen } from './el'
import { route } from './'

export function createFirstUser() {
    const s =
        '<div class="first-user">' +
        '<div class="first-user-description">Since you\'re the first user, please create an account to start tracking your time.</div>' +
        '<input type="text" class="user" name="username" placeholder="Username">' +
        '<input type="password" class="password" placeholder="Password">' +
        '<button class="first-user-submit">Create User</button>' +
        '</div>'
    el('.content').innerHTML = s
    el('.user').focus()
    el('.first-user-submit').disabled = true
    clicked('.first-user-submit', _submit)
    listen(['.user', '.password'], 'input', () => el('.first-user-submit').disabled = !el('.user').value || !el('.password').value)
    listen(['.user', '.password'], 'keydown', e => {
        if (!el('.first-user-submit').disabled && e.code === 'Enter') {
            _submit()
        }
    })
}

function _submit() {
    el('.first-user-submit').innerHTML = 'Creating User...'
    el('.first-user-submit').disabled = true
    el('.user').disabled = true
    el('.password').disabled = true
    fetch(window.location, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type: 'first-user', user: el('.user').value, password: el('.password').value })
    }).then(response => response.json()).then(route)
}