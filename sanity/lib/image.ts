import createImageUrlBuilder from "@sanity/image-url"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || ''

const imageBuilder = createImageUrlBuilder({ projectId, dataset })

export const urlForImage = (source: SanityImageSource) =>
  imageBuilder.image(source).auto("format").fit("max")