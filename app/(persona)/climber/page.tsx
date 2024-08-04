import PersonaSelector from "@/components/PersonaSelector"
import { loadPostsByPersona, loadPersona} from "@/sanity/lib/queries"
import Hero from "@/components/Hero"
import MPData from "@/components/MPData"
import ShanLogoHeader from "@/components/ShanLogoHeader"
import PostList from "@/components/PostList"

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
    <MPData />
    <PostList posts={posts} />
  </>
  )
}