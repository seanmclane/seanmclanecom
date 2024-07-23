import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: rule => rule.required()
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          validation: rule => rule.required()
        }
      ]
    }),
    defineField({
      name: 'persona',
      title: 'Persona',
      type: 'reference',
      to: {type: 'persona'},
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: "array",
      of: [
        { type: "block" }, 
        { type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessiblity.',
                options: {
                  isHighlighted: true,
              },
            },
          ],
        }],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      persona: 'persona.fullName',
      media: 'mainImage',
    },
    prepare(selection) {
      const {persona} = selection
      return {...selection, subtitle: persona && `by ${persona}`}
    },
  },
  initialValue: () => ({
    publishedAt: new Date().toISOString()
  })
})