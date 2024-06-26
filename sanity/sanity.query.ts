import { groq } from "next-sanity"
import client from './sanity.client'
import { PersonaType } from "@/types"

export async function getProfile() {
  return client.fetch(
    groq`*[_id == "profile"][0]{
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
    groq`*[_id == "settings"][0]{
    _id,
    title,
    overview,
    footer,
    ogImage {"image": asset->url}
    }
    `
  )
}

export async function getPostsByPersona(persona: {title: string}) {
  return client.fetch(
    groq`*[_type == "post" && persona->title == $persona.title]|order(publishedAt)[0...20]{
      slug,
      title,
      publishedAt,
      mainImage {alt, "image": asset->url}
    }`
  , { persona })
}