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
  const year = baseObject.year.yeartitle
  const video = baseObject.video
  const description = baseObject.description.childMarkdownRemark.html
  const heroImage = baseObject.heroImage
  const images = baseObject.images

  // console.log(props)
  return (
    <Layout location={props.location}>
      <div className="workPostContainer">
        <Helmet title={`${title} | ${siteTitle}`} />
          <h1>{title}</h1>
          <h4>{year}</h4>
          <h4>{medium}</h4>
          {/* <p>{description}</p> */}
          <p dangerouslySetInnerHTML={{ __html: description }}/>
          {
            video &&
            <iframe 
            width="100%" 
            height="315" 
            src={video} frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          }
          <Img 
            imgStyle={{ objectFit: 'contain' }}
            alt={heroImage.title}
            fluid={heroImage.fluid}
          />
          {
            images.map((img, idx)  => (
              <Img 
                imgStyle={{ objectFit: 'contain' }}
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
          year{
            yeartitle
          }
          description{
            childMarkdownRemark{
              html
            }
          }
          heroImage{
            title
            fluid(maxWidth: 3080, quality: 100){
              ...GatsbyContentfulFluid
            }
          }
          images{
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