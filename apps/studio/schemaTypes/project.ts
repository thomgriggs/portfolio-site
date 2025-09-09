import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: r => r.required() }),
    defineField({ name: 'year', type: 'number', title: 'Year' }),
    defineField({ name: 'summary', type: 'text', title: 'Summary' }),
    defineField({ name: 'type', type: 'string', title: 'Type' }),
    defineField({ name: 'industry', type: 'string', title: 'Industry' }),
    defineField({ name: 'featured', type: 'boolean', title: 'Featured' }),
  ],
})
