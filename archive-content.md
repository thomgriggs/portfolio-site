# Portfolio Archive - Complete Content Structure

## Page Overview
The Archive page (`/archive`) is a comprehensive collection of all projects spanning over a decade of front-end development work. It features:

- **Search functionality** - Filter by project title, industry, or skills
- **Category filtering** - Filter by industry type
- **Infinite scroll** - Loads 24 projects initially, then 12 more at a time
- **Project cards** - Each showing screenshot, title, industry, and description
- **Responsive design** - Works on all device sizes

## Page Structure

### Header Section
```
← Back to Home
Project Archive
A comprehensive collection of {projects.length} projects spanning over a decade of front-end development work.
```

### Search and Filter Section
- **Search Input**: "Search projects..." placeholder
- **Category Buttons**: Dynamic list based on project industries
  - "All" (default)
  - Individual industry categories from project data

### Results Section
```
Showing {visibleProjects.length} of {filteredProjects.length} projects (scroll to load more)
{percentage}% loaded
[Progress bar]
```

### Project Grid
Each project card displays:
- **Screenshot**: Project image with fallback
- **Title**: Project name
- **Industry**: Project category
- **Description**: Project details (if available)
- **External Link**: Live site URL (if available)

### Loading States
- **Infinite Scroll**: "Loading more projects..." with spinner
- **Load More Button**: "Scroll down to load more projects"
- **End State**: "You've reached the end! All {count} projects are loaded."

### Call-to-Action
```
View Featured Work → /work
```

## Data Structure

### Project Type (from Sanity)
```typescript
interface Project {
  _id: string;
  title: string;
  dateCreated: string;
  description: string;
  industry?: string;
  featured?: boolean;
  urlPath?: string;
  images: Array<{
    _key: string;
    asset: {
      _ref: string;
      _type: 'reference';
      url: string;
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  }>;
  skills?: string[];
}
```

### Sanity Query
```groq
*[_type == "project"] | order(featured desc, dateCreated desc) {
  _id, title, dateCreated, description, industry, featured, urlPath,
  images[] {
    _key, asset->{_ref, _type, url}
  },
  skills
}
```

## Key Features

### Search Functionality
- Searches across: title, industry, skills
- Case-insensitive matching
- Real-time filtering as user types

### Category Filtering
- Dynamic categories based on project industries
- "All" option to show all projects
- Resets visible count when filter changes

### Infinite Scroll
- **Initial Load**: 24 projects
- **Load More**: 12 additional projects
- **Intersection Observer**: Automatically loads when user scrolls near bottom
- **Loading States**: Visual feedback during load

### Performance Optimizations
- **Memoized filtering**: Prevents unnecessary recalculations
- **Intersection Observer**: Efficient scroll detection
- **Image optimization**: Next.js Image component with lazy loading
- **Caching**: 2-hour revalidation for Sanity data

## Accessibility Features

### Keyboard Navigation
- Tab through all interactive elements
- Enter/Space to activate buttons
- Escape to close mobile menu

### Screen Reader Support
- Semantic HTML structure
- Proper ARIA labels
- Alt text for all images
- Live regions for dynamic content

### Focus Management
- Visible focus indicators
- Logical tab order
- Skip links for main content

## Responsive Behavior

### Mobile (< 768px)
- Single column grid
- Touch-friendly buttons
- Collapsible search/filters
- Mobile-optimized spacing

### Tablet (768px - 1024px)
- Two column grid
- Larger touch targets
- Optimized spacing

### Desktop (> 1024px)
- Three column grid
- Hover states
- Full feature set

## Error Handling

### Data Loading
- Graceful fallback if Sanity is unavailable
- Empty state with helpful message
- Retry mechanisms for failed requests

### Image Loading
- Fallback for missing images
- Error states for broken images
- Lazy loading with intersection observer

## SEO Considerations

### Meta Tags
- Page title: "Archive"
- Description: "Browse all projects in Thom Griggs' portfolio archive"
- Canonical URL structure

### Structured Data
- Project schema markup
- Breadcrumb navigation
- Search functionality indexing

## Performance Metrics

### Loading Times
- **Initial Render**: < 1s
- **Search Response**: < 100ms
- **Infinite Scroll**: < 500ms
- **Image Loading**: Progressive enhancement

### Bundle Size
- **Archive Page**: ~4.87kB
- **Total JS**: ~115kB (including shared chunks)
- **Images**: Optimized with Next.js Image component

## Future Enhancements

### Potential Additions
- **Sorting options**: By date, industry, featured status
- **Advanced filters**: Date range, skills, project type
- **Export functionality**: PDF or CSV of project list
- **Analytics**: Track most viewed projects
- **Favorites**: User can bookmark projects

### Technical Improvements
- **Virtual scrolling**: For very large project lists
- **Search highlighting**: Highlight matching terms
- **Keyboard shortcuts**: Quick navigation
- **Offline support**: Cache project data

## Content Guidelines

### Project Descriptions
- Keep descriptions concise (1-2 sentences)
- Focus on technical achievements
- Include relevant technologies used
- Mention accessibility or performance improvements

### Image Requirements
- **Aspect Ratio**: Consistent across all projects
- **Resolution**: Minimum 1200px width
- **Format**: WebP preferred, PNG fallback
- **Alt Text**: Descriptive, not just "screenshot"

### Industry Categories
- Use consistent naming conventions
- Group similar industries together
- Consider user mental models
- Keep list manageable (< 10 categories)

## Maintenance Notes

### Regular Updates
- **Monthly**: Review and update project descriptions
- **Quarterly**: Audit image quality and alt text
- **Annually**: Review industry categories and grouping

### Performance Monitoring
- **Core Web Vitals**: Monitor LCP, FID, CLS
- **Search Performance**: Track search response times
- **Image Loading**: Monitor image optimization effectiveness
- **User Engagement**: Track scroll depth and interaction rates

---

*This document provides a complete overview of the Archive page structure, functionality, and content requirements. It serves as both technical documentation and content guidelines for maintaining the portfolio archive.*

