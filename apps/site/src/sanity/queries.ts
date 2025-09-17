export const ALL_PROJECTS = `
  *[_type == "project"] | order(featured desc, dateCreated desc) {
    _id, title, dateCreated, description, industry, featured, urlPath,
    images[] {
      _key, asset->{_ref, _type, url}
    },
    skills
  }
`
