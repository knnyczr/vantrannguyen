// const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const yearsPost = path.resolve('./src/templates/yearPost.js')
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
        result.data.allContentfulYear.edges.forEach(year => {
          createPage({
            path: `/${year.node.theYear}/`,
            component: yearsPost,
          })
        })
      })
    )
  })
}

// exports.createPages = async function ({ actions, graphql }) {
//   const data = await graphql(`
//     { 
//         allContentfulYear(filter: { node_locale: { eq: "en-US" } }) {
//           edges{
//             node{
//               theYear
//             }
//           }
//         }
//       }
//   `)
//   // highlight-start
//   data.allContentfulYear.edges.node.forEach(edge => {
//     const slug = edge.node.theYear
//     actions.createPage({
//       path: slug,
//       component: require.resolve(`./src/templates/yearsPost.js`),
//     })
//   })
//   // console.log(data)
// }
