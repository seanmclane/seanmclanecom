import { loadQuery } from "@/sanity/lib/loadQuery"
import { PostType } from "@/types"
import { formatISODateToLocaleString } from "@/utilities"
import Body from "@/components/Body"
import { Image } from "next-sanity/image"
import { QueryResponseInitial } from "@sanity/react-loader"
import { urlForImage } from "@/sanity/lib/image"

interface Params {
  params: {
    slug: string
  }
}

async function getPost(params: {slug: string}): Promise<QueryResponseInitial<PostType>> {
  const { slug } = params
  const post = await loadQuery<PostType>(
  `*[_type == "post" && slug.current == $slug][0]{
    title,
    persona -> {
      fullName,
      profileImage {alt, "image": asset->url},
      headline
    },
    publishedAt,
    mainImage {alt, "image": asset->url},
    body
  }`, { slug }, {next: {tags: [`post:${slug}`, "persona"]}})
  return post
}

export async function generateMetadata({params}: Params) {
  const { data: post } = await getPost(params)
  return {
    title: post.title
  }
}

export default async function Post({params}: Params) {
  const {data: post} = await getPost(params)

  // use image builder so it respects image hotspots set in Sanity
  const mainImageURL = urlForImage(post.mainImage.image).height(600).width(1200).url()
  return (
    <div className="flex flex-col items-center max-w-6xl m-auto">
      <Image src={mainImageURL} alt={post.mainImage.alt} width={1200} height={600} className="mb-8" priority />
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