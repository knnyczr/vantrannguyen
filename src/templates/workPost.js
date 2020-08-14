import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'

export default function WorkTemplate(props) {
  const siteTitle = props.data.site.siteMetadata.title
  const baseObject = props.data.allContentfulYearWork.edges[0].node
  const title = baseObject.title
  const medium = baseObject.medium
  const year = baseObject.year.yeartitle
  const description = baseObject.description.description
  const heroImage = baseObject.heroImage
  const images = baseObject.images

  console.log(props)
  return (
    <Layout location={props.location}>
      <div style={{ background: '#fff' }}>
        <Helmet title={`${title} | ${siteTitle}`} />
          <h1>{title}</h1>
          <h4>{medium}</h4>
          <h4>{year}</h4>
          <p>{description}</p>
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
          year{
            yeartitle
          }
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