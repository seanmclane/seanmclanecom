import { groq } from "next-sanity"
import client from './sanity.client'

export async function getPersona(persona: {title: string}) {
  return client.fetch(
    groq`*[_type == "persona" && title == $persona.title][0]{
    _id,
    title,
    fullName,
    headline,
    profileImage {alt, "image": asset->url},
    fullBio,
    socialLinks[]{url, icon{"image": asset->url}, name}
    }`
    , {persona})
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
    groq`*[_type == "post" && persona->title == $persona.title && draft == false]|order(publishedAt desc)[0...10]{
      slug,
      title,
      publishedAt,
      mainImage {alt, "image": asset->url}
    }`
  , { persona })
}