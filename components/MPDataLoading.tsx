export default function MPDataLoading() {
  return (
    <div role="status" className="flex flex-col items-center animate-pulse">
      <h2 className="text-theme text-4xl py-2">
        Sean on Mountain Project
      </h2>
      <div className="flex flex-row flex-wrap justify-center">
        {[1,2,3,4].map(() =>(
          <div className="p-2 m-2 text-white bg-theme rounded-lg min-w-40 text-center shadow-md"> 
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <span className="sr-only">Loading...</span>
          </div>)
        )}
      </div>
      <h2 className="mt-4">Recent Climbs</h2>
      <div className="flex flex-row flex-wrap justify-center max-w-6xl">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="text-white bg-theme p-2 m-2 rounded-lg min-w-80 shadow-md">
              <div className="h-2.5 bg-white rounded-full mb-2.5"></div>
              <div className="h-2 bg-white rounded-full mb-2.5"></div>
          </div>
        ))}
      </div>
    </div>
  )
}