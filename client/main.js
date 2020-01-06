import datePicker from 'js-datepicker'
import { el } from './el'

function update() {

}

export function main() {
    let s = '<div class="time">' +
        '<div class="time-control">' +
        '<div class="time-date"></div>' +
        '<div class="time-previous"><</div>' +
        '<div class="time-today">today</div>' +
        '<div class="time-next"><</div>'
        '<div>' +
        '<table class="time-week">' +
        '<tr><td><div>Sun</div><div class="time-day-0"></div></td>' +
        '<tr><td><div>Mon</div><div class="time-day-1"></div></td>' +
        '<tr><td><div>Tue</div><div class="time-day-2"></div></td>' +
        '<tr><td><div>Wed</div><div class="time-day-3"></div></td>' +
        '<tr><td><div>Thu</div><div class="time-day-4"></div></td>' +
        '<tr><td><div>Fri</div><div class="time-day-5"></div></td>' +
        '<tr><td><div>Sat</div><div class="time-day-6"></div></td>' +
        '</table>'
    el('.content').innerHTML = s
    update()
}