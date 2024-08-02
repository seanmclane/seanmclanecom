import PersonaSelector from "@/components/PersonaSelector"
import { loadPersona, loadPostsByPersona } from "@/sanity/lib/queries"
import Hero from "@/components/Hero"
import ShanLogoHeader from "@/components/ShanLogoHeader"
import PostList from "@/components/PostList"

export const metadata = {
  title: "Entrepreneur"
}

export default async function Entrepreneur() {

  const [{data: persona}, {data: posts}] = await Promise.all([
    loadPersona({title: "entrepreneur"}),
    loadPostsByPersona({title: "entrepreneur"})
  ])

  if (!persona) {
    return <></>
  }

  return (
  <div>
    <ShanLogoHeader links={persona.socialLinks} />
    <PersonaSelector selected="entrepreneur"/>
    <Hero persona={persona} />
    <PostList posts={posts} />
  </div>
  )
}