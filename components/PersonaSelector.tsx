import Dropdown from "@/components/Dropdown"
import { loadQuery } from "@/sanity/lib/loadQuery"

interface Props {
  selected?: string
}

async function getPersonas() {
  //adding perspecticve published stopped weird characters in my links from stega
  const personas = await loadQuery<string[]>({ query: `*[_type == "persona" && active == true]| order(order) .title`, perspective: "published"})
  return personas
}

export default async function PersonaSelector({selected}: Props) {
  const personas = await getPersonas()

  return (
    <div className="flex flex-col items-center px-4 lg:px-8 mt-16">
      <h1 className="text-6xl lg:text-8xl">Sean McLane is a 
        <span className="text-theme text-6xl lg:text-8xl font-sans uppercase bg-transparent">
          <Dropdown defaultState={selected || "_____________"} items={personas} listStyle="bg-white border-theme border-2 shadow-md" />
        </span>
      </h1>
    </div>
  )
}
