import React from 'react';
import { useStaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Nav from './nav'

import './scss/desktop.scss'


export default function DesktopLanding({logo, years, orderYears}){

    let data = useStaticQuery(graphql`
        query tabletDesktop {
            site {
                siteMetadata {
                title
                }
            }

        }
    `)
    const siteTitle = data.site.siteMetadata.title

    return(
        <div className="landingDesktop">
            <Helmet title={siteTitle} />
            <Nav logo={logo} years={years} orderYears={orderYears} />
            <section>
                <h1>Recent Work</h1>
                section
            </section>        
        </div>
    )
}