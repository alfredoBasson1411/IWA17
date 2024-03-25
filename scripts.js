// scripts.js

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

// Only edit below 

const createArray = (length) => {
    const result = []

    for (let i = 0; i < length; i++) {
        result.push(i)
    }

    return result
}

const createData = () => {
    const current = new Date()
    current.setDate(1)

    const startDay = current.getDay()
    const daysInMonth = getDaysInMonth(current)

    const weeks = createArray(5)
    const days = createArray(7)
    const result = []

    for (const weekIndex of weeks) {
        result.push({
            week: weekIndex + 1,
            days: []
        })

        for (const dayIndex of days) {
            const day = dayIndex - startDay + (weekIndex * 7) + 1
            const isValid = day > 0 && day <= daysInMonth

            result[weekIndex].days.push({
                dayOfWeek: dayIndex + 1,
                value: isValid ? day : '',
            })
        }
    }

    return result
}

// Inside the addCell function:
// Create an HTML string for a table cell with the specified class and value.
// Return the HTML string.
const addCell = (existing, classString, value) => {
    const result = /* html */ `
        ${existing}
        <td class="${classString}">
            &nbsp;${value}&nbsp;
        </td>
    `

    return result
}

// Inside the createHtml function:
// Iterate through each week in the data.
// Initialize an empty string to store the inner HTML for each row.
// Add a table cell for the week number in the leftmost column.
// Iterate through each day in the week.
// Check if the current day is today, a weekend, or alternate week for styling.
// Add a table cell with appropriate styling and value for each day.
// Append the inner HTML string for the row to the result.
// Return the complete HTML string for the table.
const createHtml = (data) => {
    let result = ''

    for (const { week, days } of data) {
        let inner = ""
        inner = addCell(inner, 'table__cell table__cell_sidebar', `Week ${week}`)
    
        for (const { dayOfWeek, value } of days) {
            const isToday = new Date().getDate() === value
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
            const isAlternate = week % 2 === 0
            
            let classString = 'table__cell'

            if (isToday) classString += ' table__cell_today'
            if (isWeekend) classString += ' table__cell_weekend'
            if (isAlternate) classString += ' table__cell_alternate'

            inner = addCell(inner, classString, value)
        }

        result = `
            ${result}
            <tr>${inner}</tr>
        `
    }
    
    return result
}


// Only edit above

const current = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`

const data = createData()
document.querySelector('[data-content]').innerHTML = createHtml(data)