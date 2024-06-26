import PersonaSelector from "@/components/PersonaSelector"
import { getPostsByPersona } from "@/sanity/sanity.query"
import { PostType } from "@/types"
import Image from "next/image"
import Link from "next/link"

export default async function Climber() {
  const posts: [PostType] = await getPostsByPersona({title: "climber"})
  return (
  <div>
    <PersonaSelector selected="climber"/>
    <div className="flex flex-col items-center">
      <h1>Climber</h1>
      {posts.length>0 && posts.map(p => (
        <Link href={`/post/${p.slug.current}`}  key={p.slug.current} className="flex flex-col items-center">
          <h2>{p.title} by {p.publishedAt}</h2>
          <Image src={p.mainImage.image} alt={p.mainImage.alt} width={200} height={200}/>
        </Link>
      ))}
    </div>
  </div>
  )
}