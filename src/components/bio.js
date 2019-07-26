/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    
    query BioQuery {
      avatar: file(absolutePath: { regex: "/icons8-dog_footprint_filled.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
      contentfulPerson(name: {eq: "Hug A Pet"}) {
        name
        shortBio {
          shortBio
        }
        image {
          sizes(maxWidth: 157) {
            srcWebp
          }
        }
      }
    }
  `)

  // const { author, social } = data.site.siteMetadata
  
  const author = data.contentfulPerson.name
  const img = data.contentfulPerson.image.sizes
  console.log('image URL', img)

  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        Pflegetipps von <strong>{author}</strong>.
        {` `}Folgen Sie / erreichen Sie uns auf &nbsp;
        <a style={{color:'rgb(2, 132, 137)'}} href={`https://www.facebook.com/hugapet.de/`}>
           Facebook,
        </a> &nbsp; 
        <a style={{color:'rgb(2, 132, 137)'}} href={`https://www.instagram.com/hugapetofficial/`}>
           Instagram,
        </a> &nbsp;
        <a style={{color:'rgb(2, 132, 137)'}} href={`https://www.linkedin.com/company/hugapet`}>
           LinkedIn,
        </a>&nbsp; oder rufen Sie uns an <a style={{color:'rgb(2, 132, 137)'}} href="tel:03023327742">030 233 277 42</a>
      </p>
    </div>
  )
}

export default Bio
