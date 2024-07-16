import { revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { parseBody } from "next-sanity/webhook"
import { revalidateSecret } from "@/sanity/lib/api"

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string
      slug?: string | undefined
    }>(req, revalidateSecret)

    if (!isValidSignature) {
      return new Response("Invalid Signature", { status: 401 })
    }

    if (!body?._type) {
      return new Response("Bad Request", { status: 400 })
    }

    revalidateTag(body._type)
    if (body.slug) {
      revalidateTag(`${body._type}:${body.slug}`)
    }
    
    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    })
  } catch (error: any) {
    console.error(error)
    return new Response(error.message, { status: 500 })
  }
}
