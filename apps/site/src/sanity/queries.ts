export const ALL_PROJECTS = `
  *[_type == "project"] | order(featured desc, year desc) {
    _id, title, year, summary, type, industry, featured
  }
`
