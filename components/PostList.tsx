import Link from "next/link"
import Card from "./Card"
import { PostType } from "@/types"
import { formatISODateToLocaleString } from "@/utilities"
import { urlForImage } from "@/sanity/lib/image"

export default function PostList({posts}: {posts: PostType[]}) {
  return (
  <div className="flex flex-col items-center mb-8">
    <h2 className="text-4xl">Blog Posts</h2>
    <div className="flex flex-col items-center lg:items-start lg:flex-row lg:justify-center lg:max-w-[1400px] m-auto flex-wrap">
      {posts.length>0 && posts.map(p => (
        <Link className="m-4" href={`/post/${p.slug.current}`} key={p.slug.current}>
          <Card
            title={p.title}
            subtitle={formatISODateToLocaleString(p.publishedAt)}
            image={urlForImage(p.mainImage).height(300).width(400).url()}
            alt={p.mainImage.alt}
            bgClass="bg-theme"
            textClass="text-white"
          />
        </Link>
      ))}
    </div>
  </div>
  )
}