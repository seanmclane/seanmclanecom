import PersonaSelector from "@/components/PersonaSelector"
import { loadPostsByPersona, loadPersona } from "@/sanity/lib/queries"
import Hero from "@/components/Hero"
import ShanLogoHeader from "@/components/ShanLogoHeader"
import PostList from "@/components/PostList"

export const metadata = {
  title: "Nerd"
}

export default async function Nerd() {

  const [{data: persona}, {data: posts}] = await Promise.all([
    loadPersona({title: "nerd"}),
    loadPostsByPersona({title: "nerd"})
  ])

  if (!persona) {
    return <></>
  }

  return (
  <div>
    <ShanLogoHeader links={persona.socialLinks} />
    <PersonaSelector selected="nerd"/>
    <Hero persona={persona} />
    <PostList posts={posts} />
  </div>
  )
}