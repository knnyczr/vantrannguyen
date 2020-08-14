import React, { useState } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Navbar, Nav, Button } from 'react-bootstrap'
import get from 'lodash/get'

import './scss/nav.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'


export default () => {
  const data = useStaticQuery(graphql`
    {
      allFile(filter: {name:{regex: "/logo/"}, extension: {regex: "/(svg)/"}}) {
        edges {
          node {
            publicURL
          }
        }
      } 

      allContentfulYears(filter: { node_locale: { eq: "en-US" } }){
        edges{
          node{
            yeartitle
          }
        }
      }
      
    }
  `)

  const [menuCheck, setmenuCheck] = useState(false)
  const changeMenu = () => {
    setmenuCheck(!menuCheck)
  }
  const years = data.allContentfulYears.edges
  return (
    <Navbar collapseOnSelect expand="*" variant="light">
    <Navbar.Brand href="#home">
      <img 
        src={data.allFile.edges[0].node.publicURL}
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => changeMenu()} >
      {
        menuCheck === true 
        ? <FontAwesomeIcon role="button" aria-pressed="true" icon={faTimes} /> 
        : <FontAwesomeIcon role="button" aria-pressed="false" icon={faBars} />
      }
    </Navbar.Toggle>
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        {
          years.map((year, index) => (
            <Link key={index} to={`/${year.node.yeartitle}/`}>{year.node.yeartitle}</Link>
          ))
        }
      </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
