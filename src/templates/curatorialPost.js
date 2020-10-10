import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Img from 'gatsby-image'
import Layout from '../components/layout'


// import '../components/scss/workPost.scss'

export default function curatorialPost(props) {

  const baseObject = props.data.allContentfulCuratorialProjects.edges[0].node
  const siteTitle = props.data.site.siteMetadata.title
  const title = baseObject.title



  console.log(props)
  return (
    <Layout location={props.location}>
      <div className="workPostContainer">
        <Helmet title={`${title} | ${siteTitle}`} />
          hello from curatorial work
      </div>
    </Layout> 
  )

}

export const pageQuery = graphql`
  query curitorialWorkPostQuery($cPost: String!) {
    site {
      siteMetadata {
        title
      }
    }

    allContentfulCuratorialProjects(filter: { node_locale: { eq: "en-US" }, titleUrl: { eq: $cPost } }){
        edges{
            node{
                id
                title
                titleUrl
                dates
                location
                description
                heroimage{
                    id
                }
            }
        }
    }
  }
`