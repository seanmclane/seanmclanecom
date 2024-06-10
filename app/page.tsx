import Image from "next/image"
import { getProfile } from "@/sanity/sanity.query"
import { ProfileType } from "@/types"
import { PortableText } from "next-sanity"

export default async function Home() {
  const profile: ProfileType = await getProfile()

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>{profile.fullName}</h1>
      <p>{profile.shortBio}</p>
      <PortableText value={profile.fullBio}/>
      <Image
        className="rounded-2xl mb-4 object-cover max-h-96 min-h-96 bg-top bg-[#1d1d20]"
        src={profile.profileImage.image}
        width={400}
        height={400}
        quality={100}
        alt={profile.profileImage.alt}
      />
    </main>
  )
}
