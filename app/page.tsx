import PersonaSelector from "@/components/PersonaSelector"
import ShanLogoHeader from "@/components/ShanLogoHeader"

export default async function Home() {

  return (
    <main className="flex flex-col items-center">
      <ShanLogoHeader />
      <PersonaSelector />
    </main>
  )
}
