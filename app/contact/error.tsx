'use client'
import { useEffect } from 'react'
import ShanLogoHeader from '@/components/ShanLogoHeader'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div>
      <ShanLogoHeader links={[]} />
      <div className="flex flex-col items-center mt-16">
        <p className="text-xl">{error?.message || "Something went wrong!"}</p>
        <button
          className="my-8 p-4 rounded-lg bg-theme text-white font-sans"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  )
}