

export function formatISODateToLocaleString(isoDate: string) {
  //use utc to prevent losing a day on date only strings
  const date = new Date(`${isoDate}T00:00:00Z`)
  return date.toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  })
}