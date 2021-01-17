import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import Nav from '../components/nav'
import DesktopLanding from '../components/desktopLanding'

import {debounce} from '../components/funcs.js'

import '../components/scss/homepage.scss'

export default function RootIndex() {

  const [windowSize, setWindowSize] = useState({
    width: 400,
    height: 700,
  });

  useEffect(() => {
    const debounceHandleResize = debounce(function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 500)
    window.addEventListener("resize", debounceHandleResize);
    // handleResize();
    return () => window.removeEventListener("resize", debounceHandleResize);
  })

  
  let data = useStaticQuery(graphql`
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
  `)

  const years = data.allContentfulYears.edges
  const siteTitle = data.site.siteMetadata.title
  const logo = data.allFile.edges[0].node.publicURL

  // this is to put all the years in descending order. 
  const orderYears = years.map((year) => year.node.yeartitle).slice().sort((a, b)=> b - a);

  // console.log(windowSize.width)
  return(
    <>
      {
        windowSize.width >= 768 ?
        (
          <DesktopLanding years={years} logo={logo} orderYears={orderYears} />
        ) : (
          <div className="homepage">
            <Helmet title={siteTitle} />
            <Nav years={years} logo={logo} orderYears={orderYears}/>
          </div>
        )
      }
    </>
  )
}