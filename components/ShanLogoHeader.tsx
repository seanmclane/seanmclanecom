import Link from "next/link"
import shan from "@/app/icon.png"
import Image from "next/image"

export default function ShanLogoHeader() {
  return (
    <Link className="min-w-full" href="/">
        <Image className="m-8" src={shan.src} height={60} width={60} alt="Sean's Chinese shan character icon"/>
      </Link>
  )
}