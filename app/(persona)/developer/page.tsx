import PersonaSelector from "@/components/PersonaSelector"
import { loadPersona, loadPostsByPersona } from "@/sanity/lib/queries"
import Hero from "@/components/Hero"
import ShanLogoHeader from "@/components/ShanLogoHeader"
import PostList from "@/components/PostList"

export const metadata = {
  title: "Developer"
}

export default async function Developer() {

  const [{data: persona}, {data: posts}] = await Promise.all([
    loadPersona({title: "developer"}),
    loadPostsByPersona({title: "developer"})
  ])

  if (!persona) {
    return <></>
  }
  
  return (
  <div>
    <ShanLogoHeader links={persona.socialLinks} />
    <PersonaSelector selected="developer"/>
    <Hero persona={persona} />
    <PostList posts={posts} />
  </div>
  )
}