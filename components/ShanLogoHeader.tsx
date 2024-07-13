import Link from "next/link"
import shan from "@/app/icon.png"
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
      <Link href="/">
        <Image className="m-4 lg:m-8" src={shan.src} height={60} width={60} alt="Sean's Chinese shan character icon"/>
      </Link>
      <span className="mr-4 lg:mr-8 flex flex-row flex-wrap">
        {props.links && props.links.length > 0 ? props.links.map(l => (
          <Link className="flex flex-row items-center p-1 mr-1" href={l.url} key={l.url}>
            <Image src={l.icon.image} alt={l.name || "social link"} title={l.name || ''} width={30} height={30} />
          </Link>
        )) : null}
      </span>
    </div>
  )
}