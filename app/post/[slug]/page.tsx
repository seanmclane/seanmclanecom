import client from "@/sanity/sanity.client"
import { PortableText } from "next-sanity"

interface Props {
  post: {
    slug: {
      current: string
    }
  }
}

async function getPost(params: {slug: string}) {
  const {slug = ""} = params
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{
    title,
    author -> {
      fullName,
      profileImage {alt, "image": asset->url}
    },
    publishedAt,
    mainImage,
    body
  }`, { slug })
  console.log(post)
  return post
}

export default async function Post({params}: {params: {slug: string}}) {
  const post = await getPost(params)

  return (
    <article className="flex flex-col items-center p-24">
      <h1>{post.title}</h1>
      <h4>{post.author.fullName}</h4>
      <PortableText value={post.body} />
    </article>
  )
}