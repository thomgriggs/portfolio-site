import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: r => r.required() }),
    defineField({ 
      name: 'dateCreated', 
      type: 'date', 
      title: 'Date Created',
      validation: r => r.required()
    }),
    defineField({ 
      name: 'description', 
      type: 'text', 
      title: 'Description',
      validation: r => r.required()
    }),
    defineField({ 
      name: 'industry', 
      type: 'string', 
      title: 'Industry',
      options: {
        list: [
          { title: 'Hospitality', value: 'hospitality' },
          { title: 'Spa & Wellness', value: 'spa-wellness' },
          { title: 'Restaurant', value: 'restaurant' },
          { title: 'Technology', value: 'technology' },
          { title: 'E-commerce', value: 'ecommerce' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Education', value: 'education' },
          { title: 'Real Estate', value: 'real-estate' },
          { title: 'Travel & Tourism', value: 'travel-tourism' },
          { title: 'Fashion', value: 'fashion' },
          { title: 'Other', value: 'other' }
        ]
      }
    }),
    defineField({ name: 'featured', type: 'boolean', title: 'Featured' }),
    defineField({ name: 'urlPath', type: 'url', title: 'Project URL' }),
    defineField({ 
      name: 'images', 
      type: 'array', 
      title: 'Project Images',
      of: [{ 
        type: 'image',
        options: {
          hotspot: true
        }
      }],
      validation: r => r.min(1).error('At least one image is required')
    }),
    defineField({ 
      name: 'skills', 
      type: 'array', 
      title: 'Skills Used',
      of: [{ 
        type: 'string',
        options: {
          list: [
            { title: 'HTML5', value: 'html5' },
            { title: 'CSS3', value: 'css3' },
            { title: 'JavaScript', value: 'javascript' },
            { title: 'TypeScript', value: 'typescript' },
            { title: 'React', value: 'react' },
            { title: 'Next.js', value: 'nextjs' },
            { title: 'Vue.js', value: 'vuejs' },
            { title: 'Angular', value: 'angular' },
            { title: 'Node.js', value: 'nodejs' },
            { title: 'Express', value: 'express' },
            { title: 'MongoDB', value: 'mongodb' },
            { title: 'PostgreSQL', value: 'postgresql' },
            { title: 'MySQL', value: 'mysql' },
            { title: 'Firebase', value: 'firebase' },
            { title: 'Sanity CMS', value: 'sanity' },
            { title: 'WordPress', value: 'wordpress' },
            { title: 'Shopify', value: 'shopify' },
            { title: 'WooCommerce', value: 'woocommerce' },
            { title: 'Tailwind CSS', value: 'tailwind' },
            { title: 'Bootstrap', value: 'bootstrap' },
            { title: 'SASS/SCSS', value: 'sass' },
            { title: 'jQuery', value: 'jquery' },
            { title: 'PHP', value: 'php' },
            { title: 'Python', value: 'python' },
            { title: 'Java', value: 'java' },
            { title: 'C#', value: 'csharp' },
            { title: 'Git', value: 'git' },
            { title: 'Docker', value: 'docker' },
            { title: 'AWS', value: 'aws' },
            { title: 'Vercel', value: 'vercel' },
            { title: 'Netlify', value: 'netlify' },
            { title: 'Figma', value: 'figma' },
            { title: 'Adobe XD', value: 'adobe-xd' },
            { title: 'Sketch', value: 'sketch' },
            { title: 'Photoshop', value: 'photoshop' },
            { title: 'Illustrator', value: 'illustrator' },
            { title: 'Responsive Design', value: 'responsive-design' },
            { title: 'Mobile Development', value: 'mobile-development' },
            { title: 'PWA', value: 'pwa' },
            { title: 'SEO', value: 'seo' },
            { title: 'Performance Optimization', value: 'performance' },
            { title: 'Accessibility (ADA/WCAG)', value: 'accessibility' },
            { title: 'E-commerce', value: 'ecommerce' },
            { title: 'API Integration', value: 'api-integration' },
            { title: 'Third-party Integrations', value: 'integrations' },
            { title: 'Email Marketing', value: 'email-marketing' },
            { title: 'Analytics', value: 'analytics' },
            { title: 'Testing', value: 'testing' },
            { title: 'CI/CD', value: 'cicd' }
          ]
        }
      }]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'industry',
      media: 'images.0'
    }
  }
})
