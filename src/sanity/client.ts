import { createClient } from '@sanity/client'

export const sanity = createClient({
  projectId: '669ljbt4',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: true, // Enable CDN for better performance
  perspective: 'published', // Only fetch published content
})
