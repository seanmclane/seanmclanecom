import PersonaSelector from "@/components/PersonaSelector"
import { getPostsByPersona } from "@/sanity/sanity.query"
import { PostType } from "@/types"
import Card from "@/components/Card"
import Link from "next/link"
import { formatISODateToLocaleString } from "@/utilities"
import MPData from "@/components/MPData"

export const metadata = {
  title: "Climber"
}

export default async function Climber() {
  const posts: [PostType] = await getPostsByPersona({title: "climber"})
  return (
  <div>
    <PersonaSelector selected="climber"/>
    <div className="flex flex-col items-center mb-8">
      <MPData />
    </div>
    <div className="flex flex-col items-center mb-8">
      <h2 className="text-4xl">Blog Posts</h2>
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