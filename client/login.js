import { clicked } from 'clicked'
import './login.css'
import { el, listen } from './el'
import { route } from './'

export function login(fail) {
    let s = '<div class="login">'
    if (fail) {
        s += '<div class="login-error">Wrong user or password. Please try again.</div>'
    } else {
        s += '<div class="login-description">Please enter your user and password to log in.</div>'
    }
    s += '<input type="text" class="user" name="username" placeholder="Username">' +
        '<input type="password" class="password" placeholder="Password">' +
        '<button class="login-submit">Create User</button>' +
        '</div>'
    el('.content').innerHTML = s
    el('.user').focus()
    el('.login-submit').disabled = true
    clicked('.login-submit', _submit)
    listen(['.user', '.password'], 'input', () => el('.login-submit').disabled = !el('.user').value || !el('.password').value)
    listen(['.user', '.password'], 'keydown', e => {
        if (!el('.login-submit').disabled && e.code === 'Enter') {
            _submit()
        }
    })
}

function _submit() {
    el('.login-submit').innerHTML = 'Logging in...'
    el('.login-submit').disabled = true
    el('.user').disabled = true
    el('.password').disabled = true
    fetch(window.location, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type: 'login', user: el('.user').value, password: el('.password').value })
    }).then(response => response.json()).then(route)
}