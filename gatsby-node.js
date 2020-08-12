// const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const yearsPost = path.resolve('./src/templates/yearPost.js')
    const workPost = path.resolve('./src/templates/workPost.js')
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

            allContentfulYearWork(filter: { node_locale: { eq: "en-US" } }){
              edges{
                node{
                  contentful_id
                  titleUrl
                  title
                  medium
                  heroImage {
                    id
                  }
                  year{
                    theYear
                  }
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
        result.data.allContentfulYear.edges.map(year => {
          createPage({
            path: `/${year.node.theYear}`,
            component: yearsPost,
            context: {
              year: year
            }
          })
        })
        result.data.allContentfulYearWork.edges.map(work => {
          createPage({
            path: `/${work.node.year.theYear}/${work.node.titleUrl}`, 
            component: workPost,
            context: {
              work: work
            }
          })
        })
      })
    )
  })
}
