import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'

export default function WorkTemplate(props) {
  // const post = get(this.props, 'data.contentfulBlogPost')
  // const siteTitle = get(this.props, 'data.site.siteMetadata.title')
  console.log(props)
  return (
    <Layout location={props.location}>
      <div style={{ background: '#fff' }}>
        {/* <Helmet title={`${post.title} | ${siteTitle}`} /> */}
          
      </div>
    </Layout>
  )

}