import Dropdown from "@/components/Dropdown"

interface Props {
  selected?: string
}

export default async function PersonaSelector({selected}: Props) {

  return (
    <div className="flex flex-col items-center px-4 lg:px-8 mt-16">
      <h1 className="text-6xl lg:text-8xl">Sean McLane is a 
        <span className="text-theme text-6xl lg:text-8xl font-sans uppercase bg-transparent">
          <Dropdown defaultState={selected || "_____________"} items={[]} listStyle="bg-white border-theme border-2 shadow-md" />
        </span>
      </h1>
    </div>
  )
}
