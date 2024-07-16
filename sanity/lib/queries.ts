import { groq } from "next-sanity"
import { loadQuery } from './loadQuery'
import { PersonaType, PostType, SettingsType } from "@/types"

export async function getPersona(persona: {title: string}) {
  return loadQuery<PersonaType>({
    query:
    groq`*[_type == "persona" && title == $persona.title][0]{
    _id,
    title,
    fullName,
    headline,
    profileImage {alt, "image": asset->url},
    fullBio,
    socialLinks[]{url, icon{"image": asset->url}, name}
    }`,
    params: {persona}
  })
}

export async function getSettings() {
  return loadQuery<SettingsType>({
    query: 
    groq`*[_id == "settings"][0]{
    _id,
    title,
    overview,
    footer,
    ogImage {"image": asset->url}
    }
    `
  })
}

export async function getPostsByPersona(persona: {title: string}) {
  return loadQuery<PostType[]>({
    query:
    groq`*[_type == "post" && persona->title == $persona.title]|order(publishedAt desc)[0...10]{
    slug,
    title,
    publishedAt,
    mainImage {alt, "image": asset->url}
    }`
  , params: { persona }
})
}