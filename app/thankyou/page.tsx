import ShanLogoHeader from "@/components/ShanLogoHeader"
import Link from "next/link"

export const metadata = {
  title: "Thank You"
}

export default function ThankYou() {

  return (
  <div>
    <ShanLogoHeader links={[]} />
    <div className="flex flex-col items-center mt-16 p-8">
      <p className="text-xl">{"Thank you for contacting me. I will get back to you as soon as I'm able."}</p>
      <Link className="font-sans text-xl my-8 p-4 w-[50vw] text-center rounded-lg bg-theme hover:bg-theme-dark shadow-lg text-white" href="/">Return Home</Link>
    </div>
  </div>
  )
}