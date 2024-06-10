import { groq } from "next-sanity"
import client from './sanity.client'

export async function getProfile() {
  return client.fetch(
    groq`*[_type == "profile"][0]{
    _id,
    fullName,
    headline,
    profileImage {alt, "image": asset->url},
    shortBio,
    location,
    fullBio,
    email,
    socialLinks
    }
    `
  )
}

export async function getSettings() {
  return client.fetch(
    groq`*[_type == "settings"][0]{
    _id,
    title,
    overview,
    footer,
    ogImage {"image": asset->url}
    }
    `
  )
}