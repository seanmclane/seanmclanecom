import { PersonaType } from "@/types"
import { PortableText } from "next-sanity"
import React from "react"

export default function Hero(props: {persona: PersonaType}) {
  return (
    <div id="hero" className="flex flex-col items-center mb-8 " style={{minHeight: "20vh"}}>
      <div className="max-w-3xl m-auto italic text-2xl p-8 text-center">
      <PortableText value={props.persona.fullBio}/>
      </div>
    </div>
  )
}