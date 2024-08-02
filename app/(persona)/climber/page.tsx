import PersonaSelector from "@/components/PersonaSelector"
import { loadPostsByPersona, loadPersona} from "@/sanity/lib/queries"
import Card from "@/components/Card"
import Hero from "@/components/Hero"
import Link from "next/link"
import { formatISODateToLocaleString } from "@/utilities"
import MPData from "@/components/MPData"
import ShanLogoHeader from "@/components/ShanLogoHeader"

export const metadata = {
  title: "Climber"
}

export default async function Climber() {

  const [{data: persona}, {data: posts}] = await Promise.all([
    loadPersona({title: "climber"}),
    loadPostsByPersona({title: "climber"})
  ])

  if (!persona) {
    return <></>
  }
  
  return (
  <>
    <ShanLogoHeader links={persona.socialLinks} />
    <PersonaSelector selected="climber"/>
    <Hero persona={persona} />
    <div className="flex flex-col items-center mb-8">
      <MPData />
    </div>
    <div className="flex flex-col items-center mb-8">
      <h2 className="text-4xl">Blog Posts</h2>
      <div className="flex flex-col items-center lg:items-start lg:flex-row lg:justify-center lg:max-w-[1400px] m-auto flex-wrap">
        {posts.length>0 && posts.map(p => (
          <Link className="m-4" href={`/post/${p.slug.current}`} key={p.slug.current}>
            <Card
              title={p.title}
              subtitle={formatISODateToLocaleString(p.publishedAt)}
              image={p.mainImage.image}
              alt={p.mainImage.alt}
              bgClass="bg-gray-100"
              textClass="text-gray-800"
            />
          </Link>
        ))}
      </div>
    </div>
  </>
  )
}