import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'links',
  title: 'Links',
  type: 'object',
  fields: [
    defineField({ name: 'live', type: 'url', title: 'Live URL' }),
    defineField({ name: 'repo', type: 'url', title: 'Repository URL' }),
    defineField({ name: 'case', type: 'url', title: 'Case Study URL' }),
    defineField({ name: 'pen',  type: 'url', title: 'CodePen URL' }),
  ],
})
