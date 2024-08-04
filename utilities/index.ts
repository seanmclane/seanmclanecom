

export function formatISODateToLocaleString(isoDate: string) {
  // use utc to prevent losing a day on date only strings from MP climbs
  // remove time if on date from post published datetime for example
  const dateOnly = isoDate.substring(0,10)
  const date = new Date(`${dateOnly}T00:00:00Z`)
  return date.toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  })
}

export function getMonthNameFromIndex(monthIndex: number) {
  const date = new Date(2020, monthIndex, 1)
  return date.toLocaleString('en-US', {month: 'short'})
}