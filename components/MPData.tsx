import { formatISODateToLocaleString } from "@/utilities"
import { MPDataType } from "@/types"
import Link from "next/link"
import { loadPersona } from "@/sanity/lib/queries"
import { getClimbsData } from "@/app/actions"

export default async function MPData() {
  const [{data: persona}, {
    hardestIce,
    hardestMixed,
    hardestSport,
    hardestTrad,
    recentClimbs
  }] = await Promise.all([
    loadPersona({title: "climber"}),
    getClimbsData()
  ])

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-theme text-4xl py-2">
        <Link href={persona.socialLinks && persona.socialLinks.length > 0 ? persona.socialLinks.filter(s => s.url.includes("mountainproject"))[0].url : "https://www.mountainproject.com"}>Sean on Mountain Project</Link>
      </h2>
      <div className="flex flex-row flex-wrap justify-center">
        <Link href={hardestIce.URL} className="p-2 m-2 text-white bg-theme rounded-lg min-w-40 text-center shadow-md">
          <h2>Hardest Ice Lead</h2>
          <h3>{hardestIce.Rating}</h3>
        </Link>
        <Link href={hardestMixed.URL} className="p-2 m-2 text-white bg-theme rounded-lg min-w-40 text-center shadow-md">
          <h2>Hardest Mixed Lead</h2>
          <h3>{hardestMixed.Rating}</h3>
        </Link>
        <Link href={hardestTrad.URL} className="p-2 m-2 text-white bg-theme rounded-lg min-w-40 text-center shadow-md">
          <h2>Hardest Trad Lead</h2>
          <h3>{hardestTrad.Rating}</h3>
        </Link>
        <Link href={hardestSport.URL} className="p-2 m-2 text-white bg-theme rounded-lg min-w-40 text-center shadow-md">
          <h2>Hardest Sport Lead</h2>
          <h3>{hardestSport.Rating}</h3>
        </Link>
      </div>
      <h2 className="mt-4">Recent Climbs</h2>
      <div className="flex flex-row flex-wrap justify-center max-w-6xl">
        {recentClimbs && recentClimbs.map(c => (
          <div key={`${c.Route} - ${c.Notes}`} className="text-white bg-theme p-2 m-2 rounded-lg min-w-80 shadow-md">
            <Link href={c.URL}>
              <h2 className="px-2">{c.Route}</h2>
              <div className="flex flex-row justify-between items-center">
                <h3 className="px-2">{formatISODateToLocaleString(c.Date)}</h3>
                <h3 className="px-2">{c.Rating}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}