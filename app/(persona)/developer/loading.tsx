import PersonaSelectorLoading from "@/components/PersonaSelectorLoading"
import HeroLoading from "@/components/HeroLoading"
import ShanLogoHeader from "@/components/ShanLogoHeader"
import CardLoading from "@/components/CardLoading"

export const metadata = {
  title: "Developer"
}

export default function Loading() {

  const posts = [{
    slug: {
      current:'loading1'
    }
  },
  {
    slug: {
      current:'loading2'
    }
  },
  {
    slug: {
      current:'loading3'
    }
  }]

  return (
  <>
    <ShanLogoHeader links={[]} />
    <PersonaSelectorLoading selected="developer"/>
    <HeroLoading />
    <div className="flex flex-col items-center mb-8">
      <h2 className="text-4xl">Blog Posts</h2>
      <div className="flex flex-col items-center lg:items-start lg:flex-row lg:justify-center lg:max-w-[1400px] m-auto flex-wrap">
        {posts.length>0 && posts.map(p => (
          <CardLoading key={p.slug.current}/>
        ))}
      </div>
    </div>
  </>
  )
}