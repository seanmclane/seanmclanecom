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
  date: string,
  route: string,
  rating: string,
  notes: string,
  url: string,
  pitches: number,
  location: string,
  avgStars: number,
  yourStars: number,
  style: string,
  leadStyle?: string,
  routeType: string,
  yourRating: string,
  length: number,
  ratingCode: number
}

export type MPClimbsType = {
  Date: string,
  Route: string,
  Rating: string,
  Notes: string,
  URL: string,
  Pitches: number,
  Location: string,
  'Avg Stars': number,
  'Your Stars': number,
  Style: string,
  'Lead Style'?: string,
  'Route Type': string,
  'Your Rating': string,
  Length: number,
  'Rating Code': number
}

export type MPDataType = {
  recentClimbs: ClimbsType[],
  hardestIce: ClimbsType,
  hardestMixed: ClimbsType,
  hardestSport: ClimbsType,
  hardestTrad: ClimbsType
}