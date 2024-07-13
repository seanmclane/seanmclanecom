import { PortableTextBlock } from "sanity"

export type SettingsType = {
  _id: string,
  title: string,
  overview: PortableTextBlock[],
  footer: PortableTextBlock[],
  ogImage: {
    image: string
  }
}

export type PersonaType = {
  title: string,
  description: string,
  order: number,
  fullName: string,
  headline: string,
  profileImage: {
    alt: string,
    image: string
  },
  fullBio: PortableTextBlock[],
  socialLinks: Array<{
    url: string,
    name?: string,
    icon: {
      image: string
    }
  }>
}

export type PostType = {
  slug: {
    current: string
  },
  title: string,
  draft: boolean,
  publishedAt: string,
  persona: PersonaType,
  mainImage: {
    alt: string,
    image: string
  },
  body: PortableTextBlock[],
}

export type ClimbsType = {
  Date: string,
  Route: string,
  Rating: string,
  Notes: string,
  URL: string,
  Pitches: number,
  Location: string,
  Avg_Stars: number,
  Your_Stars: number,
  Style: string,
  Lead_Style?: string,
  Route_Type: string,
  Your_Rating: string,
  Length: number,
  Rating_Code: number
}
