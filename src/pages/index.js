import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import Nav from '../components/nav'
import DesktopLanding from '../components/desktopLanding'

import '../components/scss/homepage.scss'

export default function RootIndex() {

  const [windowSize, setWindowSize] = useState({
    width: 768,
    height: 1048,
  });

  // SRC: https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
function debounce(fn, ms) {
  let timer
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 500)
    window.addEventListener("resize", debouncedHandleResize);

    return () => window.removeEventListener("resize", debouncedHandleResize);
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
        windowSize.width >= 767 ?
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