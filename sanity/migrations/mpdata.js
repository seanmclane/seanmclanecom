import { parse } from "csv-parse/sync"
import {createClient} from "@sanity/client"

/*

run as "node --env-file='.env' sanity/migrations/mpdata.js"
update LAST_RUN_DATE afterward as needed

*/

function convertClimbsToJSON(csv) {
  const climbs = parse(
    csv, 
    {
      columns: true,
      trim: true,
      skip_empty_lines: true
    }
  )
  return climbs
}

async function getData() {
  const r = await fetch("https://www.mountainproject.com/user/108959833/sean-mclane/tick-export")
  if (!r.ok) {
    throw new Error("Did not get MP data")
  }
  const climbsJSON = convertClimbsToJSON(await r.text())
  return climbsJSON
}

function transformClimb(externalClimb) {
  return {
    _id: `${externalClimb['Date']}_${externalClimb['Route']}_${externalClimb['Style']}_${externalClimb['Lead Style']}`.replace(/[^a-zA-Z0-9._]/g, ""),
    _type: "climb",
    date: externalClimb['Date'],
    route: externalClimb['Route'],
    rating: externalClimb['Rating'],
    notes: externalClimb['Notes'],
    url: externalClimb['URL'],
    pitches: Number(externalClimb['Pitches']),
    location: externalClimb['Location'],
    avgStars: Number(externalClimb['Avg Stars']),
    yourStars: Number(externalClimb['Your Stars']),
    style: externalClimb['Style'],
    leadStyle: externalClimb['Lead Style'],
    routeType: externalClimb['Route Type'],
    yourRating: externalClimb['Your Rating'],
    length: Number(externalClimb['Length']),
    ratingCode: Number(externalClimb['Rating Code'])
  }
}

const climbs = await getData()

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.API_VERSION,
  token: process.env.SANITY_CLI_TOKEN,
  useCdn: false
})

const logData = {
  totalClimbs: 0,
  climbs: []
}

// reduce api calls by running only for newer climbs, set in env UPDATE_CLIMBS_AFTER
climbs.filter(c => c.Date >= process.env.UPDATE_CLIMBS_AFTER).map(c => {
  client.createOrReplace(transformClimb(c))
  logData.totalClimbs += 1
  logData.climbs.push(c.Route)
})

console.log(`Climbs Added / Updated:\n${logData.totalClimbs}\n${logData.climbs.join("\n")}`)