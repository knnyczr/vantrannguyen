import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Img from 'gatsby-image'

import '../components/scss/curatorial.scss'

export default function Curatorial(){
    const data = useStaticQuery(graphql`
        {
            site {
                siteMetadata {
                    title
                }
            }
            allContentfulCuratorialProjects(filter: { node_locale: { eq: "en-US" } }){
                edges{
                    node{
                        title
                        titleUrl
                        dates
                        heroimage{
                            title
                            fluid(maxWidth: 3080, quality: 100){
                                ...GatsbyContentfulFluid
                            }
                        }
                    }
                }
            }
        }
    `)
    const siteTitle = data.site.siteMetadata.title
    const heroImages = data.allContentfulCuratorialProjects.edges
    return(
        <Layout>
            <div className="curatorial-wrapper"> 
                <Helmet title={`Curatorial | ${siteTitle}`} />
                <h1>Curatorial</h1>
                {
                    heroImages.map((work, index) => (
                        <div 
                            className="curatorial-work"
                            key={index}
                        >
                            <Link 
                                to={`/curatorial/${work.node.titleUrl}`}
                            >
                                <Img 
                                    // imgStyle={{ objectFit: 'contain' }}
                                    alt={work.node.heroimage.title} 
                                    fluid={work.node.heroimage.fluid} 
                                />
                                <h2>{work.node.title}</h2>
                                <h3>{work.node.dates}</h3>
                                <p>VIEW &#10230;</p>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </Layout>
    )
}
