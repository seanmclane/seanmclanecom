import Dropdown from "@/components/Dropdown"
import { loadQuery } from "@/sanity/lib/loadQuery"

interface Props {
  selected?: string
}

async function loadPersonas() {
  //adding stega false stopped weird characters in my links
  //hopefully this works on vercel previews too...
  const personas = await loadQuery<string[]>(`*[_type == "persona"]| order(order) .title`, {}, {stega: false, next: { tags: ["persona"] }})
  return personas
}

export default async function PersonaSelector({selected}: Props) {
  const {data: personas} = await loadPersonas()

  return (
    <div className="flex flex-col items-center px-2 md:px-8 mt-16">
      <h1 className="text-6xl md:text-8xl">Sean McLane is { selected === "_____________" ? "a" : 
                                                            selected?.substring(0,1).match(/[a,e,i,o,u]/g) ? "an" : "a"
                                                            }
        <span className="text-theme text-6xl md:text-8xl font-sans uppercase bg-transparent">
          <Dropdown defaultState={selected || "_____________"} items={personas} listStyle="bg-white border-theme border-2 shadow-md" />
        </span>
      </h1>
    </div>
  )
}
