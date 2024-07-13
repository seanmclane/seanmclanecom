import {Image} from "next-sanity/image"

interface Props {
  title: string
  subtitle: string
  shortDescription?: string
  image?: string
  alt?: string
  width?: number
  height?: number
  bgClass?: string
  textClass?: string
}

export default function Card({title, subtitle, shortDescription, image, alt, width, height, bgClass, textClass}: Props) {
  return (
    <div className={`${bgClass} ${textClass} flex flex-col items-start rounded-lg shadow-md`}>
      <div>
        {image ? <Image className="rounded-t-lg" src={image} alt={alt || "placeholder image"} width={width || 400} height={height || 200}/> : <span className="flex flex-1"></span>}
      </div>
      <div className="p-4">
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        {shortDescription && <p>{shortDescription}</p>}
      </div>
    </div>
  )
}