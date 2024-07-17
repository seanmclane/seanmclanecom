export default function HeroLoading() {
  return (
    <div role="status" className="flex flex-col items-center mb-8 " style={{minHeight: "20vh"}}>
      <div className="max-w-3xl m-auto italic text-2xl p-8 text-center">
        <div className="animate-pulse">
          <div className="h-2.5 bg-gray-200 rounded-full w-80 lg:w-[600px] mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  ) 
}