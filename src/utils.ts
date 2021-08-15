import {DateOnly} from './types'

export function formatDate (date: Date): DateOnly {
  let month = `${date.getMonth() + 1}`
  let day = String(date.getDate())
  const year = date.getFullYear()

  if (month.length < 2) {
    month = `0${month}`
  }

  if (day.length < 2) {
    day = `0${day}`
  }

  return new DateOnly([
    year,
    month,
    day
  ].join('-'))
}
