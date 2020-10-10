// const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const yearsPost = path.resolve('./src/templates/yearPost.js')
    const workPost = path.resolve('./src/templates/workPost.js')
    const curatorialPost = path.resolve('./src/templates/curatorialPost.js')
    resolve(
      graphql(
        `
          {

            allContentfulYears(filter: { node_locale: { eq: "en-US" } }){
              edges{
                node{
                  yeartitle
                }
              }
            }

            allContentfulYearWork(filter: { node_locale: { eq: "en-US" } }){
              edges{
                node{
                  title
                  titleUrl
                  year {
                    yeartitle
                  }
                }
              }
            }

            allContentfulCuratorialProjects(filter: { node_locale: { eq: "en-US" } }){
              edges{
                node{
                  titleUrl
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

        // console.log(result)
        result.data.allContentfulYears.edges.map(yearData => {
          createPage({
            path: `/${yearData.node.yeartitle}`,
            component: yearsPost,
            context: {
              year: yearData.node.yeartitle 
            }
          })
        })

        result.data.allContentfulYearWork.edges.map(work => {
          createPage({
            path: `/${work.node.year.yeartitle}/${work.node.titleUrl}`, 
            component: workPost,
            context: {
              workName: work.node.titleUrl
            }
          })
        })

        result.data.allContentfulCuratorialProjects.edges.map(work => {
          createPage({
            path: `/curatorial/${work.node.titleUrl}`, 
            component: curatorialPost, 
            context: {
              cPost: work.node.titleUrl
            }
          })
        })

      })
    )
  })
}
