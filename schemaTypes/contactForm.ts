import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactForm',
  title: 'Contact Form Submission',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string'
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email'
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'string'
    }),
    defineField({
      name: 'sentAt',
      title: 'Sent At',
      type: 'date'
    }),
  ],

  initialValue: () => ({
    sentAt: new Date().toISOString()
  })
})