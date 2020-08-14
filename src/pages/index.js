import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'

import '../components/scss/homepage.scss'


export default class RootIndex extends Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const years = get(this, 'props.data.allContentfulYears.edges')
    const logo = get(this, 'props.data.allFile.edges[0].node.publicURL')
    console.log(this)
    return (
        <div className="homepage">
          <Helmet title={siteTitle} />
          <img 
            src={logo}
          />
          <ul>
            <li>
              <Link to="/bio/">
                BIO
              </Link>
            </li>
            {
              years.map((year, index) => (
                <li
                  key={index}
                >
                    <Link to={`/${year.node.yeartitle}/`}>{year.node.yeartitle}</Link>
                  </li>
              ))
            }
          </ul>
        </div>
    )
  }
}

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }

    allFile(filter: {name:{regex: "/logo/"}, extension: {regex: "/(svg)/"}}) {
        edges {
          node {
            publicURL
          }
        }
      } 

    allContentfulYears(filter: { node_locale: { eq: "en-US" } }) {
      edges{
        node{
          yeartitle
        }
      }
    }

  }
`
