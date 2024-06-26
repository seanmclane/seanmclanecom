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
      name: 'description',
      title: 'Description',
      type: 'text',
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
  ],
})