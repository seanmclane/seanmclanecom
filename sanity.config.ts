import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { presentationTool } from 'sanity/presentation'

// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"])

// Define the singleton document types
const singletonTypes = new Set(["settings", "profile"])


export default defineConfig({
  name: 'default',
  title: 'seanmclane.com',

  projectId: 'zapiev65',
  dataset: 'production',

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) => 
        S.list()
          .title("Content")
          .items([
            // Our singleton type has a list item with a custom child
            S.listItem()
            .title("Settings")
            .id("settings")
            .child(
              // Instead of rendering a list of documents, we render a single
              // document, specifying the `documentId` manually to ensure
              // that we're editing the single instance of the document
              S.document()
                .schemaType("settings")
                .documentId("settings")
            ),
            // Regular document types
            // S.documentTypeListItem("blogPost").title("Blog Posts"),
            // S.documentTypeListItem("author").title("Authors"),
            S.documentTypeListItem("post").title("Blog Posts"),
            S.documentTypeListItem("persona").title("Personas"),
            S.documentTypeListItem("climb").title("Climbs")
          ])
        }), 
      visionTool(),
      presentationTool({
        previewUrl: {
          draftMode: {
            enable: '/api/draft',
          },
        },
      }),  
    ],
  schema: {
    types: schemaTypes,
    // Filter out singleton types from the global “New document” menu options
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
