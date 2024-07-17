import { groq } from "next-sanity"
import { loadQuery } from './loadQuery'
import { ClimbsType, PersonaType, PostType, SettingsType } from "@/types"

export async function loadPersona(persona: {title: string}) {
  return loadQuery<PersonaType>(
    groq`*[_type == "persona" && title == $persona.title][0]{
    _id,
    title,
    fullName,
    headline,
    profileImage {alt, "image": asset->url},
    fullBio,
    socialLinks[]{url, icon{"image": asset->url}, name}
    }`, { persona }, {next: {tags: ["persona"]}})
}

export async function loadSettings() {
  return loadQuery<SettingsType>(
    groq`*[_id == "settings"][0]{
    _id,
    title,
    overview,
    footer,
    ogImage {"image": asset->url}
    }
    `, {}, {next: {tags: ["settings"]}})
}

export async function loadPostsByPersona(persona: {title: string}) {
  return loadQuery<PostType[]>(
    groq`*[_type == "post" && persona->title == $persona.title]|order(publishedAt desc)[0...10]{
    slug,
    title,
    publishedAt,
    mainImage {alt, "image": asset->url}
    }`, { persona }, {next: {tags: ["post"]}})
}

export async function loadClimbs() {
  return loadQuery<ClimbsType[]>(
    groq`*[_type == "climb"]|order(date desc){
    _id,
    date,
    route,
    rating,
    notes,
    url,
    pitches,
    location,
    avgStars,
    yourStars,
    style,
    leadStyle,
    routeType,
    yourRating,
    length,
    ratingCode
    }
    `, {}, {next: {tags: ["climb"]}})
}