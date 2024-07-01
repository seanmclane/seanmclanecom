import { PortableText } from "next-sanity"
import { urlForImage } from "@/sanity/sanity.image"
import { Image } from "next-sanity/image"
import { getImageDimensions } from "@sanity/asset-utils"

const Body = ({props}: any) => {

  const customBlockComponents = {
    types: {
      image: ({ value }) => {
        const {width, height} = getImageDimensions(value.asset)
        // we need to get the image source url, and since @sanity/image-url will give us optimised images for each instance we use it
        const imgUrl = urlForImage(value.asset)
          .height(height)
          .width(width)
          .url()

        return (
          <Image
            width={width}
            height={height}
            alt={value.alt}
            src={imgUrl}
            sizes="100vw"
            priority={false}
            blurDataURL={urlForImage(value.asset).width(24).height(24).blur(10).url()}
            placeholder="blur"
          />
        )
      }
    },
  }

  return <PortableText value={props} components={customBlockComponents} />
}
export default Body