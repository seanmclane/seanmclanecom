"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { BiCaretDown } from "react-icons/bi"

interface DropdownProps {
  defaultState: string
  items: Array<string>
  listStyle?: string
}

export default function Dropdown({defaultState, items, listStyle}: DropdownProps) {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState(defaultState)
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleClickOutside = (e: any) => {
    if (container.current && !container.current.contains(e.target)) {
      setShow(false)
    }
  }

  return (
    <div ref={container}>
      <button onClick={() => setShow(current => !current)}>
        {selected}<BiCaretDown className="inline" />
        {show && <ul className={`absolute py-2 lg:py-4 ${listStyle || ""}`}>{items.map(i => i!==selected && (
          <li className="text-left px-4 lg:px-8" key={i} onClick={() => {
            setSelected(i)
            router.push(`/${i}`)
          }}>
            {i}
          </li>
        ))}</ul>}
      </button>
    </div>
  )
}