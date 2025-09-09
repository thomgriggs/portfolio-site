import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'images',
  title: 'Images',
  type: 'object',
  fields: [
    defineField({ name: 'hero', type: 'image', title: 'Hero', options: { hotspot: true } }),
    defineField({ name: 'desktop', type: 'image', title: 'Desktop', options: { hotspot: true } }),
    defineField({ name: 'mobile', type: 'image', title: 'Mobile', options: { hotspot: true } }),
  ],
})
