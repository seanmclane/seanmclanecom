import { PortableTextBlock } from "sanity"

export type ProfileType = {
  _id: string,
  fullName: string,
  headline: string,
  profileImage: {
    alt: string,
    image: string
  },
  shortBio: string,
  email: string,
  fullBio: PortableTextBlock[],
  location: string,
  socialLinks: {
    mountainproject: string,
    github: string,
    instagram: string
  },
}

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
  order: number
}

export type PostType = {
  slug: {
    current: string
  },
  title: string,
  draft: boolean,
  publishedAt: string,
  author: ProfileType,
  mainImage: {
    alt: string,
    image: string
  },
  body: PortableTextBlock[],
  persona: PersonaType
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
