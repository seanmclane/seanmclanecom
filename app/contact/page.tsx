import ShanLogoHeader from "@/components/ShanLogoHeader"
import ContactForm from "@/components/ContactForm"

export const metadata = {
  title: "Contact"
}

export default function Contact() {

  return (
  <div>
    <ShanLogoHeader links={[]} />
    <ContactForm />
  </div>
  )
}