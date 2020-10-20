import React from 'react';
import { graphql, useStaticQuery, Link} from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'

import '../components/scss/bio.scss'

export default function bio() {
  const data = useStaticQuery(graphql`
  {
    contentfulPerson{
      name
      email
      image{
        fluid{
          ...GatsbyContentfulFluid
        }
      }
      shortBio {
        childMarkdownRemark {
          html
        }
      }
    }
  }
  `)
  // console.log(data)
  const name = data.contentfulPerson.name
  const email = data.contentfulPerson.email
  const shortbio = data.contentfulPerson.shortBio.childMarkdownRemark.html
  const image = data.contentfulPerson.image
  return (
    <Layout>
      <div className="bio"> 
        <h1>{name}</h1>
        <Img 
          imgStyle={{ objectFit: 'contain' }}
          alt={name}
          fluid={image.fluid}
        />
        <a href={`mailto:${email}`}>Email Me &#10230;</a>
        <p dangerouslySetInnerHTML={{ __html: shortbio }} />
      </div>
    </Layout>
  );
}
