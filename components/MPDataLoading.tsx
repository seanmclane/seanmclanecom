export default function MPDataLoading() {
  return (
    <div role="status" className="flex flex-col items-center animate-pulse">
      <h2 className="text-theme text-4xl py-2">
        Sean on Mountain Project
      </h2>
      <div className="flex flex-row flex-wrap justify-center">
        {[1,2,3,4].map(i =>(
          <div key={i} className="p-2 m-2 text-white bg-theme rounded-lg min-w-40 text-center shadow-md"> 
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <span className="sr-only">Loading...</span>
          </div>)
        )}
      </div>
      <h2 className="my-4">My Climbs in {new Date().toLocaleString('en-US',{year: "numeric"})}</h2>
      <div className="flex flex-row justify-center items-end max-w-6xl animate-pulse">
          {[123,240,143,113,179,147].map(i => (
            <div key={i} className="text-white bg-theme min-w-12 mx-1" style={{height: i}}></div>
          ))}
      </div>
    </div>
  )
}