import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'playground',
  title: 'Playground',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: r => r.required() }),
    defineField({ name: 'summary', type: 'text', title: 'Summary' }),
  ],
})
