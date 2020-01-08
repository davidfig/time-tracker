import * as luxon from 'luxon'
import datePicker from 'js-datepicker'
import { clicked } from 'clicked'
import { el } from './el'
import '../node_modules/js-datepicker/dist/datepicker.min.css'
import './time.css'

let _current, _picker

function update() {
    el('.time-date-string').innerHTML = _current.toLocaleString(luxon.DateTime.DATE_HUGE)
    el('.time-entries').innerHTML = ''
    el('.time-total').innerHTML = '-'
    for (let i = 1; i < 8; i++) {
        el(`.time-day-${i}`).innerHTML = '-'
    }
    fetch(window.location, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type: 'get-time', time: _current.toMillis() })
    }).then(response => response.json()).then(data => {
        let entries = '<div class="time-entry time-entry-edit">' +
            '<input type=" class="time-entry-edit-description"'
            '</div>'
        let total = 0
        for (let i = 1; i < 8; i++) {
            const entry = data[i - 1]
            const day = el(`.time-day-${i}`)
            total += entry.time
            day.innerHTML = entry.time === 0 ? '-' : entry.time
            if (_current.weekday === i) {
                el(`.time-day-box-${i}`).classList.add('time-day-current')
                for (let line of entry.entries) {

                }
            } else {
                el(`.time-day-box-${i}`).classList.remove('time-day-current')
            }
        }
        el('.time-entries').innerHTML = entries
        el('.time-total').innerHTML = total
    })
}

export function time() {
    let s = '<div class="time-page">' +
        '<div class="time">' +
        '<div class="time-header">' +
        '<div class="time-date">' +
        '<div class="time-date-calendar">&#128197;</div>' +
        '<div class="time-date-string"></div>' +
        '</div>' +
        '<div class="time-control">' +
        '<div class="time-previous" title="previous week">&#x21E6;</div>' +
        '<div class="time-today" title="today">today</div>' +
        '<div class="time-next" title="next week">&#x21E8;</div>' +
        '</div>' +
        '</div>' +
        '<div class="time-week">' +
        '<div class="time-day-box time-day-box-1"><div>Mon</div><div class="time-day time-day-1"></div></div>' +
        '<div class="time-day-box time-day-box-2"><div>Tue</div><div class="time-day time-day-2"></div></div>' +
        '<div class="time-day-box time-day-box-3"><div>Wed</div><div class="time-day time-day-3"></div></div>' +
        '<div class="time-day-box time-day-box-4"><div>Thu</div><div class="time-day time-day-4"></div></div>' +
        '<div class="time-day-box time-day-box-5"><div>Fri</div><div class="time-day time-day-5"></div></div>' +
        '<div class="time-day-box time-day-box-6"><div>Sat</div><div class="time-day time-day-6"></div></div>' +
        '<div class="time-day-box time-day-box-7"><div>Sun</div><div class="time-day time-day-7"></div></div>' +
        '<div class="time-day-total"><div class="time-day-total-label">Total:&nbsp;</div><div class="time-total"></div></div>' +
        '</div>' +
        '<div class="time-entries">' +
        '</div>' +
        '<div class="time-total">' +
        '<span class="time-total-title">Daily Total: </span>' +
        '<span class="time-total-amount">0</span>' +
        '</div>' +
        '</div>'
    el('.content').innerHTML = s
    _current = luxon.DateTime.local()
    _current.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    clicked('.time-previous', () => {
        _current = _current.minus({ week: 1 })
        update()
    })
    clicked('.time-next', () => {
        _current = _current.plus({ week: 1 })
        update()
    })
    clicked('.time-today', () => {
        _current = luxon.DateTime.local()
        update()
    })
    clicked('.time-date-calendar', () => {
        _picker.setDate(_current.toJSDate(), true)
        _picker.show()
    })
    for (let i = 1; i < 8; i++) {
        clicked(`.time-day-box-${i}`, () => {
            if (i > _current.weekday) {
                _current = _current.plus({ days: i - _current.weekday })
                update()
            } else if (i < _current.weekday) {
                _current = _current.minus({ days: _current.weekday - i })
                update()
            }
        })
    }
    _picker = datePicker('.time-date-calendar', {
        onSelect: (_, date) => {
            _current = luxon.DateTime.fromJSDate(date)
            update()
        }
    })
    _picker.hide()
    update()
}