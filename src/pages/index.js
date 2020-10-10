import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import { Dropdown } from 'react-bootstrap'
import '../components/scss/homepage.scss'


export default function RootIndex() {
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

  console.log(orderYears)
  return (
    <div className="homepage">
      <Helmet title={siteTitle} />
      <img 
        alt="logo"
        className="logo"
        src={logo}
      />
      <ul>
        <li>
          <Link to="/bio/">
            BIO
          </Link>
        </li>
        <li>
          <Link to={`/${orderYears[0]}/`}>
            {orderYears[0]}
          </Link>
        </li>


        <Dropdown className="dropdownmenu">
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            Older Work
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {
              years.map((year, index) => (
                <li
                  key={index}
                  className="list-of-years"
                >
                    <Link  to={`/${year.node.yeartitle}/`}>{year.node.yeartitle}</Link>
                  </li>
              ))
            }
          </Dropdown.Menu>
        </Dropdown>

        <li>
          <Link to={`/curatorial/`}>
            Curatorial Work
          </Link>
        </li>

      </ul>
    </div>
  )
}
