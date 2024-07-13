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
      <h1 className="text-6xl lg:text-8xl">Sean McLane is a 
        <span className="text-theme text-6xl lg:text-8xl font-sans uppercase bg-transparent">
          <Dropdown defaultState={selected || "_____________"} items={personas} listStyle="bg-white border-theme border-2" />
        </span>
      </h1>
    </div>
  )
}
