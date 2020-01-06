export function el(query, parent=document) {
    return parent.querySelector(query)
}

export function els(query, parent=document) {
    return parent.querySelectorAll(query)
}

/**
 *
 * @param {(String|String[]|HTMLElement|HTMLElement[])} element
 * @param {(String|String[])} events
 * @param {function} callback
 */
export function listen(element, events, callback) {
    const elements = []
    element = Array.isArray(element) ? element : [element]
    for (const e of element) {
        if (typeof e === 'string') {
            elements.push(el(e))
        } else {
            elements.push(e)
        }
    }
    events = Array.isArray(events) ? events : [events]
    for (const event of events) {
        for (const e of elements) {
            e.addEventListener(event, callback)
        }
    }
}