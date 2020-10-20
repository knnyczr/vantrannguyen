import React, { useContext } from 'react'
import { graphql, Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import Masonry from 'react-masonry-css'
import { WindowSize } from '../components/layout'

import '../components/scss/yearPost.scss'


export default function YearsTemplate(props) {

  const year = props.pageContext.year
  const siteTitle = props.data.site.siteMetadata.title
  const works = props.data.allContentfulYears.edges[0].node.year___work
  const medium = props.data.allContentfulYears.edges[0].node.year___work.medium


  return (
      <Layout location={props.location}>
        <div className="yearWorkContainer">
          <Helmet title={`${year} | ${siteTitle}`} />
          <h1>{year}</h1>
          <Masonry
            breakpointCols={
              {
                default: 3,
                1024: 2,
                768: 2,
                767: 1
              }
          
          }
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {
              works.map((work, index) => (
                <Link 
                  key={work.id}
                  to={`${work.titleUrl}`}
                >
                  <Img imgStyle={{ objectFit: 'contain' }} alt={work.heroImage.description} fluid={work.heroImage.fluid} />
                  <h2>{work.title}</h2>
                  <p>VIEW &#10230;</p>
                </Link>
              ))
            }
          </Masonry>
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
            id
            titleUrl
            title
            medium
            heroImage{
              id
              description
              fluid(maxWidth: 3080, quality: 100){
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    }

  }
`