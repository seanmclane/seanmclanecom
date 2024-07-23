'use client'

import Input from "./Input"
import SubmitButton from "./SubmitButton"
import { submitForm } from "@/app/actions"

export default function ContactForm() {

  return (
    <div className="flex flex-col items-center ">
      <h1 className="mb-8">Contact</h1>
      <form name="contact" action={submitForm} className="text-center w-full md:w-[60vw] lg:w-[50vw] px-8">
      <input type="hidden" name="access_key" value="2e1aac69-fda3-406c-8faf-22d47a26f47b" />
      <input type="checkbox" name="botcheck" className="hidden"/>
      <Input label="Name" name="name" placeholder="Jane Doe" required />
      <Input label="Email" name="email" type="email" placeholder="jane@doe.com" required />
      <Input label="Message" name="message" placeholder="I was thinking..." required textArea/>
      <SubmitButton className="font-sans text-xl my-8 p-4 w-full rounded-lg bg-theme hover:bg-theme-dark shadow-lg text-white disabled:animate-pulse" title="Submit"/>
      </form>
    </div>
  )
}