import BodyLoading from "@/components/BodyLoading"
import ImageLoading from "@/components/ImageLoading"

export const metadata = {
  title: "Nerd"
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
    <div className="flex flex-col items-center max-w-6xl m-auto">
      <ImageLoading width={1200} height={600} className="mb-8" />
    <article className="flex flex-col items-center max-w-4xl w-full">
      <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full w-24 mb-2.5"></div>
      <div className="flex flex-col justify-start mx-8">
      <BodyLoading />
      </div>
      <hr className=" border-gray-300 mt-16 w-5/6"/>
      <div className="flex flex-row justify-center items-center p-4 my-8">  
        <ImageLoading className="rounded-full grayscale" width={60} height={60} />
        <div className="text-gray-500 pl-4">
        <span className="h-2 bg-gray-200 rounded-full mb-2.5"></span>
        </div>
      </div>
    </article>
    </div>
  </>
  )
}