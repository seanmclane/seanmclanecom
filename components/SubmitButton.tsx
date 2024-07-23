'use client'

import { useFormStatus } from "react-dom"

export default function SubmitButton({title, className}: {title: string, className: string}) {
  const { pending } = useFormStatus()

  return (
    <button type="submit" className={className} disabled={pending}>
      {title}
    </button>
  )
}