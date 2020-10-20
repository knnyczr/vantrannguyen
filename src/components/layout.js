import React, { useState, useEffect, createContext, useContext } from 'react'
import './scss/base.scss'
import Container from './container'
import Navigation from './navigation'
import Footer from './footer'
import Nav from './nav'

import { graphql, useStaticQuery } from 'gatsby'


export function WindowSize(){
  const [windowSize, setWindowSize] = useState({
    width: 400,
    height: 700,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  return windowSize
}


export default function Layout({children}) {
  let data = useStaticQuery(graphql`
        query layout {
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
    `)
    const years = data.allContentfulYears.edges
    const siteTitle = data.site.siteMetadata.title
    const logo = data.allFile.edges[0].node.publicURL
  
    // this is to put all the years in descending order. 
    const orderYears = years.map((year) => year.node.yeartitle).slice().sort((a, b)=> b - a);

  const size = WindowSize()
  return (
    <Container>
      <main>
      {
        size.width >= 768 ?
        <Nav logo={logo} years={years} orderYears={orderYears}  /> 
        :
        <Navigation />
      }
      {children}
      </main>
      <Footer />
    </Container>
  )
}
