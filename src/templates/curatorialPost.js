import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Img from 'gatsby-image'
import Layout from '../components/layout'


import '../components/scss/curatorialPost.scss'

export default function curatorialPost(props) {

  const baseObject = props.data.allContentfulCuratorialProjects.edges[0].node
  const siteTitle = props.data.site.siteMetadata.title
  const title = baseObject.title
  const dates = baseObject.dates
  const location = baseObject.location
  const description = baseObject.description
  const heroimage = baseObject.heroimage
  const collection = baseObject.collection



  console.log(props)
  return (
    <Layout location={props.location}>
        <Helmet title={`${title} | ${siteTitle}`} />
        <div className="curatorial-post-wrapper">
          <h1>{title}</h1>
          <h4>{dates}</h4>
          <h6>{location}</h6>
          <p>{description}</p>
          <Img 
            alt={heroimage.title}
            fluid={heroimage.fluid}
          />
          {
            collection.map((work, index) => (
              <Img
                key={`${work.title} - ${index}`}
                alt={work.title}
                fluid={work.fluid}
              />
            ))
          }
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
                title
                dates
                location
                description
                heroimage(maxWidth: 3080, quality: 100){
                  title
                  fluid{
                    ...GatsbyContentfulFluid
                  }
                }
                collection{
                  title
                  fluid(maxWidth: 3080, quality: 100){
                    ...GatsbyContentfulFluid
                  }
                }
            }
        }
    }
  }
`