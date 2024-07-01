import { ClimbsType } from "@/types"

export function formatISODateToLocaleString(isoDate: string) {
  const date = new Date(isoDate)
  return date.toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function convertClimbsToJSON(csv: string): ClimbsType[] {
  let lines = csv.split(/\r?\n/)
  lines = lines.map((value) => {
    value = value.replace(/\,\s/g, ` `)
    return value.replace(/\"/g, ``)
  })
  const parsedData = lines.map((l) => {
    return l.split(',')
  })
  
  // remove extra rows from top and bottom
  // parsedData.splice(0,2)
  parsedData.splice(-1,1)

  let headers = parsedData.shift()
  headers = headers.map((value) => {
    return value.replace(/\s/g, `_`)
  })
  return parsedData.map((values) => {
    return headers.reduce((obj, key, index) => {
      obj[key] = values[index]
      return obj
    }, {})
  })
}