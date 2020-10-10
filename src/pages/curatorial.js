import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Img from 'gatsby-image'

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
                        heroimage{
                            title
                            fluid{
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
        <Helmet title={`Curatorial | ${siteTitle}`} />
            <h1>Curatorial</h1>
            {
                heroImages.map((work, index) => (
                    <Link to={`/curatorial/${work.node.titleUrl}`}>
                        <Img alt={work.node.heroimage.title} fluid={work.node.heroimage.fluid} />
                            <h2>{work.node.title}</h2>
                    </Link>
                ))
            }
        </Layout>
    )
}
