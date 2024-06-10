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
  socialLinks: string[],
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