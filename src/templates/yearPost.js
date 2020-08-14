import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import Img from 'gatsby-image'
import Layout from '../components/layout'

export default function YearsTemplate(props) {
  console.log(props)
  const year = props.pageContext.year
  const siteTitle = props.data.site.siteMetadata.title
  const heroImages = props.data.allContentfulYears.edges[0].node.year___work

  // console.log(heroImages)
  return (
    <Layout location={props.location}>
      <div style={{ background: '#fff' }}>
        <Helmet title={`${year} | ${siteTitle}`} />
        {
          heroImages.map((work, index) => (
            <Link 
              key={work.heroImage.id + index}
              to={`${work.titleUrl}`}
            >
              <Img alt={work.heroImage.description} fluid={work.heroImage.fluid} />
            </Link>
          ))
        }
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query yearPostQuery($year: Date!) {
    site {
      siteMetadata {
        title
      }
    }

    allContentfulYears(filter: { node_locale: { eq: "en-US" }, yeartitle: { eq: $year } }){
      edges{
        node{
          year___work{
            titleUrl
            heroImage{
              id
              description
              fluid{
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    }

  }
`