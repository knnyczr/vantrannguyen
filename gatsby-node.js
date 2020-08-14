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

            allContentfulYears(filter: { node_locale: { eq: "en-US" } }){
              edges{
                node{
                  yeartitle
                  year___work {
                    id
                    title
                    medium
                    description{
                      description
                    }
                    images{
                      id
                    }
                    heroImage {
                      id
                    }
                  }
                }
              }
            }

            allContentfulYearWork(filter: { node_locale: { eq: "en-US" } }){
              edges{
                node{
                  title
                  titleUrl
                  medium
                  heroImage{
                    id
                  }
                  images{
                    id
                  }
                  year {
                    yeartitle
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


        result.data.allContentfulYears.edges.map(yearData => {
          createPage({
            path: `/${yearData.node.yeartitle}`,
            component: yearsPost,
            context: {
              yearData: yearData
            }
          })
        })

        result.data.allContentfulYearWork.edges.map(work => {
          createPage({
            path: `/${work.node.year.yeartitle}/${work.node.titleUrl}`, 
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
