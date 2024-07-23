import ShanLogoHeader from "@/components/ShanLogoHeader"

export const metadata = {
  title: "Contact"
}

export default function Loading() {

  return (
  <>
    <ShanLogoHeader links={[]} />
    <div className="flex flex-col items-center">
      <h1 className="mb-8">Contact</h1>
      <div className="text-center w-full md:w-[60vw] lg:w-[50vw] px-8">
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        <span className="sr-only">Loading...</span>
        <div className="font-sans text-xl my-8 p-4 w-full rounded-lg bg-theme text-white">....</div>
      </div>
    </div>
  </>
  )
}