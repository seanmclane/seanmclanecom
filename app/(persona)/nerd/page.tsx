import PersonaSelector from "@/components/PersonaSelector"
import { getPostsByPersona, getPersona } from "@/sanity/lib/queries"
import Card from "@/components/Card"
import Hero from "@/components/Hero"
import Link from "next/link"
import { formatISODateToLocaleString } from "@/utilities"
import ShanLogoHeader from "@/components/ShanLogoHeader"

export const metadata = {
  title: "Nerd"
}

export default async function Nerd() {
  const persona = await getPersona({title: "nerd"})
  const posts = await getPostsByPersona({title: "nerd"})
  return (
  <div>
    <ShanLogoHeader links={persona.socialLinks} />
    <PersonaSelector selected="nerd"/>
    <Hero persona={persona} />
    <div className="flex flex-col items-center mb-8">
      <h2 className="text-4xl" >Blog Posts</h2>
      <div className="flex flex-col items-center lg:items-start lg:flex-row lg:justify-center lg:max-w-6xl m-auto">
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
  </div>
  )
}