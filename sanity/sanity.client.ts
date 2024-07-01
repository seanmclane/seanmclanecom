import { createClient, type ClientConfig } from "@sanity/client"

const config: ClientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.API_VERSION,
  useCdn: false,
}

const client = createClient(config)

export default client