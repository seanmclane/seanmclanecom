import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'climb',
  title: 'Climb',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'route',
      title: 'Route',
      type: 'string',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'string',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
    defineField({
      name: 'pitches',
      title: 'Pitches',
      type: 'number',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'avgStars',
      title: 'Avg Stars',
      type: 'number',
    }),
    defineField({
      name: 'yourStars',
      title: 'Your Stars',
      type: 'number',
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
    }),
    defineField({
      name: 'leadStyle',
      title: 'Lead Style',
      type: 'string',
    }),
    defineField({
      name: 'routeType',
      title: 'Route Type',
      type: 'string',
    }),
    defineField({
      name: 'yourRating',
      title: 'Your Rating',
      type: 'string',
    }),
    defineField({
      name: 'length',
      title: 'Length',
      type: 'number',
    }),
    defineField({
      name: 'ratingCode',
      title: 'Rating Code',
      type: 'number',
    })
  ]
})