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

  let rawHeaders = parsedData.shift() || ['']
  const headers = rawHeaders.map((value) => {
    return value.replace(/\s/g, `_`)
  })

  const headerKeys = [
    'Date',
    'Route',
    'Rating',
    'Notes',
    'URL',
    'Pitches',
    'Location',
    'Avg_Stars',
    'Your_Stars',
    'Style',
    'Lead_Style',
    'Route_Type',
    'Your_Rating',
    'Length',
    'Rating_Code'
  ]

  let out: ClimbsType[] = parsedData.map((values) => {
    return headers.reduce((obj, key, index) => {
      // I don't like casting to any but I couldn't figure out why I couldn't tell it "key" was keyof ClimbsType
      (obj as any)[key] = values[index]
      return obj
    }, {} as ClimbsType)
  })
  
  return out
}