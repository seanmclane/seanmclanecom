import Link from "next/link"
import shan from "@/app/icon.png"
import contact from "@/app/contact.png"
import Image from "next/image"

interface Props {
  links: Array<{
    url: string
    name?: string
    icon: {
      image: string
    }
  }>
}

export default function ShanLogoHeader(props: Props) {
  return (
    <div className="min-w-full flex flex-row justify-between items-center">
      <Link className="mx-4 lg:mx-8 my-4" href="/">
        <Image src={shan.src} height={60} width={60} alt="Sean's Chinese shan character icon"/>
      </Link>
      <span className="mx-4 lg:mx-8 my-4 flex flex-row flex-wrap">
        {props.links && props.links.length > 0 ? props.links.map(l => (
          <Link className="flex flex-row items-center p-1 mr-1" href={l.url} key={l.url}>
            <Image src={l.icon.image} alt={l.name || "social link"} title={l.name || ''} width={30} height={30} />
          </Link>
        )) : null}
      </span>
    </div>
  )
}