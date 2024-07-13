import client from "@/sanity/sanity.client"
import { PostType } from "@/types"
import { formatISODateToLocaleString } from "@/utilities"
import Body from "@/components/Body"
import { Image } from "next-sanity/image"

interface Params {
  params: {
    slug: string
  }
}

async function getPost(params: {slug: string}): Promise<PostType> {
  const {slug = ""} = params
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{
    title,
    persona -> {
      fullName,
      profileImage {alt, "image": asset->url},
      headline
    },
    publishedAt,
    mainImage {alt, "image": asset->url},
    body
  }`, { slug })
  return post
}

export async function generateMetadata({params}: Params) {
  const post = await getPost(params)
  return {
    title: post.title
  }
}

export default async function Post({params}: Params) {
  const post = await getPost(params)

  return (
    <div className="flex flex-col items-center max-w-6xl m-auto">
      <Image src={post.mainImage.image} alt={post.mainImage.alt} width={1200} height={600} className="mb-8" priority />
    <article className="flex flex-col items-center max-w-4xl w-full">
      <h1>{post.title}</h1>
      <h3 className="mb-8">{formatISODateToLocaleString(post.publishedAt)}</h3>
      <div className="flex flex-col justify-start mx-8" id="postPortableText">
      <Body props={post.body} />
      </div>
      <hr className=" border-gray-400 mt-16 w-5/6"/>
      <div className="flex flex-row justify-center items-center p-4 my-8">  
        <Image className="rounded-full grayscale" src={post.persona.profileImage.image} alt={post.persona.profileImage.alt} width={60} height={60} />
        <div className="text-gray-500 pl-4">
          <span >{post.persona.fullName}</span>
          <span> {post.persona.headline}</span>
        </div>
      </div>
    </article>
    </div>
  )
}