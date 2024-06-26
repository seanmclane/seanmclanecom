import client from "@/sanity/sanity.client"
import Dropdown from "@/components/Dropdown"
import Link from "next/link"

interface Props {
  selected?: string
}

async function getPersonas() {
  const personas = await client.fetch(`*[_type == "persona" && active == true]| order(order) .title`)
  return personas
}

export default async function PersonaSelector({selected}: Props) {
  const personas = await getPersonas()

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-6xl lg:text-8xl"><Link className="text-theme" href="/">Sean McLane</Link> is a 
        <span className="text-theme text-6xl lg:text-8xl font-sans uppercase bg-transparent">
          <Dropdown defaultState={selected || "___________"} items={personas} listStyle="bg-black py-2 px-6 border-theme border-2" />
        </span>
      </h1>
    </div>
  )
}
