export const ALL_PROJECTS = `
  *[_type == "project"] | order(year desc) {
    _id, title, year, summary, type, industry, featured
  }
`
