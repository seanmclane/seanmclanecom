import PersonaSelector from "@/components/PersonaSelector"
import { loadPersona, loadPostsByPersona } from "@/sanity/lib/queries"
import Hero from "@/components/Hero"
import ShanLogoHeader from "@/components/ShanLogoHeader"
import PostList from "@/components/PostList"

export const metadata = {
  title: "Musician"
}

export default async function Musician() {

  const [{data: persona}, {data: posts}] = await Promise.all([
    loadPersona({title: "musician"}),
    loadPostsByPersona({title: "musician"})
  ])

  if (!persona) {
    return <></>
  }

  return (
  <div>
    <ShanLogoHeader links={persona.socialLinks} />
    <PersonaSelector selected="musician"/>
    <Hero persona={persona} />
    <PostList posts={posts} />
  </div>
  )
}