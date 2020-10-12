import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Img from 'gatsby-image'
import Layout from '../components/layout'

import '../components/scss/workPost.scss'

export default function WorkTemplate(props) {
  const siteTitle = props.data.site.siteMetadata.title
  const baseObject = props.data.allContentfulYearWork.edges[0].node

  const title = baseObject.title
  const medium = baseObject.medium
  const video = baseObject.video
  const description = baseObject.description.description
  const heroImage = baseObject.heroImage
  const images = baseObject.images

  console.log(props)
  return (
    <Layout location={props.location}>
      <div className="workPostContainer">
        <Helmet title={`${title} | ${siteTitle}`} />
          <h1>{title}</h1>
          <h4>{medium}</h4>
          <p>{description}</p>
          {
            video &&
            <iframe 
            width="100%" 
            height="315" 
            src={video} frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          }
          <Img 
            alt={heroImage.title}
            fluid={heroImage.fluid}
          />
          {
            images.map((img, idx)  => (
              <Img 
                alt={img.title}
                key={idx}
                fluid={img.fluid}
              />
            ))
          }
      </div>
    </Layout> 
  )

}

export const pageQuery = graphql`
  query workPostQuery($workName: String!) {
    site {
      siteMetadata {
        title
      }
    }

    allContentfulYearWork(filter: { node_locale: { eq: "en-US" }, titleUrl: { eq: $workName } }){
      edges{
        node{
          title
          medium
          video
          description{
            description
          }
          heroImage{
            title
            fluid{
              ...GatsbyContentfulFluid
            }
          }
          images{
            title
            fluid{
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }

  }
`