const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const yearsPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allContentfulYear(filter: { node_locale: { eq: "en-US" } }) {
              edges{
                node{
                  theYear
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
        console.log(result)
        const years = result.data.allContentfulBlogPost.edges
        years.forEach((year, index) => {
          createPage({
            path: `/${year}/`,
            component: yearsPost,
            context: {
              slug: "post.node.slug"
            },
          })
        })
      })
    )
  })
}
