import Link from "next/link"
import { loadPersona, loadClimbs } from "@/sanity/lib/queries"
import { ClimbsType } from "@/types"

import { getMonthNameFromIndex } from "@/utilities"
import StackedBarChart from "./StackedBarChart"

function processClimbs(climbs: ClimbsType[]) {
  const ratingCodes = {
    // sourced from https://www.mountainproject.com/forum/topic/116208707/rating-code-sorting-ticks
  
    // rock ratings
    rock: {
    800: '3rd',
    900: '4th',
    950: 'Easy 5th',
    1000: '5.0',
    1100: '5.1',
    1200: '5.2',
    1300: '5.3',
    1400: '5.4',
    1500: '5.5',
    1600: '5.6',
    1800: '5.7',
    1900: '5.7+',
    2000: '5.8-',
    2100: '5.8',
    2200: '5.8+',
    2300: '5.9-',
    2400: '5.9',
    2500: '5.9+',
    2600: '5.10a',
    2700: '5.10-',
    2800: '5.10a/b',
    2900: '5.10b',
    3000: '5.10',
    3100: '5.10b/c',
    3200: '5.10c',
    3300: '5.10+',
    3400: '5.10c/d',
    3500: '5.10d',
    4600: '5.11a',
    4700: '5.11-',
    4800: '5.11a/b',
    4900: '5.11b',
    5000: '5.11',
    5100: '5.11b/c',
    5200: '5.11c',
    5300: '5.11+',
    5400: '5.11c/d',
    5500: '5.11d',
    6600: '5.12a',
    6700: '5.12-',
    6800: '5.12a/b',
    6900: '5.12b',
    7000: '5.12',
    7100: '5.12b/c',
    7200: '5.12c',
    7300: '5.12+',
    7400: '5.12c/d',
    7500: '5.12d',
    8600: '5.13a',
    8700: '5.13-',
    8800: '5.13a/b',
    8900: '5.13b',
    9000: '5.13',
    9100: '5.13b/c',
    9200: '5.13c',
    9300: '5.13+',
    9400: '5.13c/d',
    9500: '5.13d',
    10500: '5.14a',
    10600: '5.14-',
    10700: '5.14a/b',
    10900: '5.14b',
    11100: '5.14',
    11150: '5.14b/c',
    11200: '5.14c',
    11300: '5.14+',
    11400: '5.14c/d',
    11500: '5.14d',
    11600: '5.15a',
    11700: '5.15-',
    11800: '5.15a/b',
    11900: '5.15b',
    12000: '5.15',
    12100: '5.15c',
    12200: '5.15+',
    12300: '5.15c/d',
    12400: '5.15d',
    },
  
    // the boulders
    boulders: {
    20000: 'V-easy', // for boulder problems rated < 5.9, which we had a fair number of
    20005: 'V0-',
    20008: 'V0',
    20010: 'V0+',
    20050: 'V0-1',
    20075: 'V1-',
    20100: 'V1',
    20110: 'V1+',
    20150: 'V1-2',
    20170: 'V2-',
    20200: 'V2',
    20210: 'V2+',
    20250: 'V2-3',
    20270: 'V3-',
    20300: 'V3',
    20310: 'V3+',
    20350: 'V3-4',
    20370: 'V4-',
    20400: 'V4',
    20410: 'V4+',
    20450: 'V4-5',
    20470: 'V5-',
    20500: 'V5',
    20510: 'V5+',
    20550: 'V5-6',
    20570: 'V6-',
    20600: 'V6',
    20610: 'V6+',
    20650: 'V6-7',
    20670: 'V7-',
    20700: 'V7',
    20710: 'V7+',
    20750: 'V7-8',
    20770: 'V8-',
    20800: 'V8',
    20810: 'V8+',
    20850: 'V8-9',
    20870: 'V9-',
    20900: 'V9',
    20910: 'V9+',
    20950: 'V9-10',
    20970: 'V10-',
    21000: 'V10',
    21010: 'V10+',
    21050: 'V10-11',
    21070: 'V11-',
    21100: 'V11',
    21110: 'V11+',
    21150: 'V11-12',
    21170: 'V12-',
    21200: 'V12',
    21210: 'V12+',
    21250: 'V12-13',
    21270: 'V13-',
    21300: 'V13',
    21310: 'V13+',
    21350: 'V13-14',
    21370: 'V14-',
    21400: 'V14',
    21410: 'V14+',
    21450: 'V14-15',
    21470: 'V15-',
    21500: 'V15',
    21510: 'V15+',
    21550: 'V15-16',
    21570: 'V16-',
    21600: 'V16',
    21610: 'V16+',
    21650: 'V16-17',
    21670: 'V17-',
    21700: 'V17',
    },
  
    // the ice ratings
    ice: {
    30000: 'WI1',
    30750: 'WI2-',
    31000: 'WI2',
    31250: 'WI2+',
    31500: 'WI2-3',
    31750: 'WI3-',
    32000: 'WI3',
    32250: 'WI3+',
    32500: 'WI3-4',
    32750: 'WI4-',
    33000: 'WI4',
    33250: 'WI4+',
    33500: 'WI4-5',
    33750: 'WI5-',
    34000: 'WI5',
    34250: 'WI5+',
    34500: 'WI5-6',
    34750: 'WI6-',
    35000: 'WI6',
    35250: 'WI6+',
    35500: 'WI6-7',
    35750: 'WI7-',
    36000: 'WI7',
    36250: 'WI7+',
    36500: 'WI7-8',
    36750: 'WI8-',
    37000: 'WI8',
    },
    alpineIce: {
    38000: 'AI1',
    38050: 'AI1-2',
    38100: 'AI2',
    38150: 'AI2-3',
    38200: 'AI3',
    38250: 'AI3-4',
    38300: 'AI4',
    38350: 'AI4-5',
    38400: 'AI5',
    38450: 'AI5-6',
    38500: 'AI6',
    },
    mixed: {
    50000: 'M1',
    50250: 'M1+',
    50500: 'M1-2',
    50750: 'M2-',
    51000: 'M2',
    51250: 'M2+',
    51500: 'M2-3',
    51750: 'M3-',
    52000: 'M3',
    52250: 'M3+',
    52500: 'M3-4',
    52750: 'M4-',
    53000: 'M4',
    53250: 'M4+',
    53500: 'M4-5',
    53750: 'M5-',
    54000: 'M5',
    54250: 'M5+',
    54500: 'M5-6',
    54750: 'M6-',
    55000: 'M6',
    55250: 'M6+',
    55500: 'M6-7',
    55750: 'M7-',
    56000: 'M7',
    56250: 'M7+',
    56500: 'M7-8',
    56750: 'M8-',
    57000: 'M8',
    57250: 'M8+',
    57500: 'M8-9',
    57750: 'M9-',
    58000: 'M9',
    58250: 'M9+',
    58500: 'M9-10',
    58750: 'M10-',
    59000: 'M10',
    59250: 'M10+',
    59500: 'M10-11',
    59750: 'M11-',
    60000: 'M11',
    60050: 'M11+',
    60900: 'M12-',
    61000: 'M12',
    61050: 'M12+',
    61900: 'M13-',
    62000: 'M13',
    62050: 'M13+',
    0: '?',
    1: '?',
    2: '?',
    3: '?',
    4: '?',
    5: '?',
    6: '?',
    7: '?',
    8: '?',
    9: '?',
    10: '?',
    },
  
    // Aid Ratings
    aid: {
    70000: 'C0',
    70010: 'A0',
    70250: 'C0+',
    70260: 'A0+',
    70500: 'C0-1',
    70510: 'A0-1',
    70750: 'C1-',
    70760: 'A1-',
    71000: 'C1',
    71010: 'A1',
    71250: 'C1+',
    71260: 'A1+',
    71500: 'C1-2',
    71510: 'A1-2',
    71750: 'C2-',
    71760: 'A2-',
    72000: 'C2',
    72010: 'A2',
    72250: 'C2+',
    72260: 'A2+',
    72500: 'C2-3',
    72510: 'A2-3',
    72750: 'C3-',
    72760: 'A3-',
    73000: 'C3',
    73010: 'A3',
    73250: 'C3+',
    73260: 'A3+',
    73500: 'C3-4',
    73510: 'A3-4',
    73750: 'C4-',
    73760: 'A4-',
    74000: 'C4',
    74010: 'A4',
    74250: 'C4+',
    74260: 'A4+',
    74500: 'C4-5',
    74510: 'A4-5',
    74750: 'C5-',
    74760: 'A5-',
    75000: 'C5',
    75010: 'A5',
    75250: 'C5+',
    75260: 'A5+',
    },
  
    // snow ratings
    snow: {
    80000: "Easy Snow",
    81000: "Mod. Snow",
    82000: "Steep Snow",
    }
  
  }

  const yearString = String(new Date().getFullYear())
  const climbsThisYear = climbs.filter(c => c.date.substring(0,4) === yearString)

  type MonthlyDataType = {
    month: string,
    Sport: number,
    Mixed: number,
    Ice: number,
    Trad: number
  }
  const climbsByMonth = climbsThisYear.reduce((acc: MonthlyDataType[], c) => {
    const month = Number(c.date.substring(5,7)) - 1
    //filter routeTypes
    let type: keyof MonthlyDataType
    if(c.routeType.includes("Mixed")) {
      type = "Mixed"
    } else if (c.routeType.includes("Ice")) {
      type = "Ice"
    } else if (c.routeType.includes("Trad")) {
      type = "Trad"
    } else {
      type = "Sport"
    }
    if (acc[month]) {
      acc[month] = {
        ...acc[month],
        month: getMonthNameFromIndex(month),
        [type]: (acc[month][type] || 0) + c.pitches
      }
    } else {
      acc[month] = {
        Sport: 0,
        Mixed: 0,
        Ice: 0,
        Trad: 0,
        month: getMonthNameFromIndex(month),
        [type]: c.pitches
      }
    }
    
    return acc
  }, [])

  const hardestSport = climbs.filter(c => 
    c.ratingCode in ratingCodes.rock
    && c.leadStyle
    && ['Onsight', 'Redpoint', 'Flash'].includes(c.leadStyle)
    && c.routeType.includes('Sport')
  ).sort((a,b) => b.ratingCode - a.ratingCode)[0]

  const hardestTrad = climbs.filter(c => 
    c.ratingCode in ratingCodes.rock
    && c.leadStyle
    && ['Onsight', 'Redpoint', 'Flash'].includes(c.leadStyle)
    && c.routeType.includes('Trad')
  ).sort((a,b) => b.ratingCode - a.ratingCode)[0]

  const hardestIce = climbs.filter(c => 
    c.ratingCode in ratingCodes.ice
    && c.leadStyle
    && ['Onsight', 'Redpoint', 'Flash'].includes(c.leadStyle)
  ).sort((a,b) => b.ratingCode - a.ratingCode)[0]

  
  function convertMGradeToNumber(c: ClimbsType) {
    // mixed rating codes apparently don't work right, so use the number after "M"
    // parse off plus or minus first
    if (c.rating.includes("+")) {
      return Number(c.rating.substring(1,c.rating.length-1)) + .5
    } else if (c.rating.includes("-")) {
      return Number(c.rating.substring(1,c.rating.length-1)) - .5
    } else {
      return Number(c.rating.substring(1,c.rating.length))
    }
  }
  const hardestMixed = climbs.filter(c => 
    c.ratingCode in ratingCodes.mixed
    && c.leadStyle
    && ['Onsight', 'Redpoint', 'Flash'].includes(c.leadStyle)
  ).sort((a,b) => convertMGradeToNumber(b) - convertMGradeToNumber(a))[0]

  return {
    climbsByMonth,
    hardestIce,
    hardestMixed,
    hardestSport,
    hardestTrad
  }

}


export default async function MPData() {
  const [{data: persona}, {data: climbsData} ] = await Promise.all([
    loadPersona({title: "climber"}),
    loadClimbs()
  ])

  const {
    hardestIce,
    hardestMixed,
    hardestSport,
    hardestTrad,
    climbsByMonth,
  } = processClimbs(climbsData)

  return (
    <div className="flex flex-col items-center mb-16">
      <h2 className="text-theme text-4xl mb-4">
        <Link href={persona.socialLinks && persona.socialLinks.length > 0 ? persona.socialLinks.filter(s => s.url.includes("mountainproject"))[0].url : "https://www.mountainproject.com"}>Sean on Mountain Project</Link>
      </h2>
      <div className="flex flex-row flex-wrap justify-center">
        <Link href={hardestIce.url} className="p-2 m-2 text-white bg-theme rounded-lg min-w-40 text-center shadow-md">
          <h2>Hardest Ice Lead</h2>
          <h3>{hardestIce.rating}</h3>
        </Link>
        <Link href={hardestMixed.url} className="p-2 m-2 text-white bg-theme rounded-lg min-w-40 text-center shadow-md">
          <h2>Hardest Mixed Lead</h2>
          <h3>{hardestMixed.rating}</h3>
        </Link>
        <Link href={hardestTrad.url} className="p-2 m-2 text-white bg-theme rounded-lg min-w-40 text-center shadow-md">
          <h2>Hardest Trad Lead</h2>
          <h3>{hardestTrad.rating}</h3>
        </Link>
        <Link href={hardestSport.url} className="p-2 m-2 text-white bg-theme rounded-lg min-w-40 text-center shadow-md">
          <h2>Hardest Sport Lead</h2>
          <h3>{hardestSport.rating}</h3>
        </Link>
      </div>
      <h2 className="my-4">Pitches Climbed in {new Date().toLocaleString('en-US',{year: "numeric"})}</h2>
      <StackedBarChart
        data={climbsByMonth}
        xKey="month"
        barKeys={["Trad", "Sport", "Ice", "Mixed"]}
        tooltip
        legend
        grid
      />
    </div>
  )
}