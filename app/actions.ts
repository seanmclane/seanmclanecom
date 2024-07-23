'use server'

import { redirect } from "next/navigation"

export async function submitForm(formData: FormData) {
  const rawFormData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string
  }

  function validateName(name: string) {
    if (!name) {
      throw new Error("Please enter your name")
    }
  }

  function validateEmail(email: string) {
    if (!email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g)){
      throw new Error("Please enter a valid email")
    }
  }
  
  function validateMessage(message: string) {
    if (!message) {
      throw new Error("Please enter a message")
    }
  }
  try {
    const {name, email, message} = rawFormData
    validateName(name)
    validateEmail(email)
    validateMessage(message)

    //submit to web3forms to email me the data
    //public key = 2e1aac69-fda3-406c-8faf-22d47a26f47b
    const r = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    })
    const data = await r.json()

    if (!data.success) {
      throw new Error(data.message)
    }

  } catch(error: any) {
    throw new Error(error?.message)
  }
  
  redirect("/thankyou")
}