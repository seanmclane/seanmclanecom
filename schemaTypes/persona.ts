import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'persona',
  title: 'Persona',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "In the format: is a blah blah blah.",
      validation: (rule) => rule.required().min(30).max(60),
    }),
    defineField({
      name: 'fullBio',
      title: 'Full Bio',
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      description: "Upload a profile picture",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'List Order (1-10)',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(10)
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean'
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      description: "Add your links:",
      of: [{type: "url"}]
    })
  ],
})