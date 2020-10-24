import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { Helmet } from 'react-helmet'
import Nav from './nav'

import Masonry from 'react-masonry-css'

import './scss/desktop.scss'


export default function DesktopLanding({logo, years, orderYears}){

    let data = useStaticQuery(graphql`
        query tabletDesktop {
            site {
                siteMetadata {
                    title
                }
            }

            allContentfulYearWork(sort: {fields: year___yeartitle, order: DESC}, filter: { node_locale: { eq: "en-US" } }) {
                edges {
                    node {
                        title
                        titleUrl
                        heroImage{
                            title
                            fluid(maxWidth: 3080, quality: 100){
                            ...GatsbyContentfulFluid
                            }
                        }
                        year {
                            yeartitle
                        }
                    }
                }
            }

        }
    `)
    const siteTitle = data.site.siteMetadata.title
    const base = data.allContentfulYearWork.edges

    console.log(base)

    return(
        <div className="landingDesktop">
            <Helmet title={siteTitle} />
            <Nav logo={logo} years={years} orderYears={orderYears} />
            <Masonry
                breakpointCols={{
                    default: 3,
                    1024: 3,
                    768: 2,
                }}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {
                    base.map((work, index) => (
                        <Link 
                            key={index}
                            to={`/${work.node.year.yeartitle}/${work.node.titleUrl}`}
                        >
                            <Img 
                                imgStyle={{ objectFit: 'contain' }} 
                                alt={work.node.heroImage.title} 
                                fluid={work.node.heroImage.fluid}
                            />
                            <h1>{work.node.title}</h1>
                            <p>VIEW &#10230;</p>
                        </Link>
                    ))
                }
          </Masonry>       
        </div>
    )
}