import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"




// var tagStyle = {
//   color:"#A0A0A0",
//   textDecoration:"none",
//   display:"inline-block",
//   padding:".33333rem .5rem",
//   lineHeight:"1",
//   borderRadius:"2px",
//   border:"1px solid #A0A0A0",
//   marginRight:".5em"
// }

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    // console.log(data)
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allContentfulBlog.edges
    


    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.blogTitle || node.slug
          return (
            <div key={node.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{color:"rgb(15, 52, 53)", boxShadow: `none` }} to={node.slug}>
                  {title}
                </Link>
              </h3>
              <p>Von <span style={{color:'#028489'}}>{node.author.name}, {node.author.title}</span></p>
              <p>{node.publishTime}</p>
              <p>{node.summary}</p>
              {node.tags.map(tag => (
              <p style={{"color":"#028489","textDecoration":"none","display":"inline-block","padding":".33333rem .5rem","lineHeight":"1","borderRadius":"2px","border":"1px solid #028489","marginRight":".5em"}} key={tag}>  
                {tag}
              </p>
              ))}
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }

    allContentfulBlog {
      edges {
        node {
          blogTitle
          summary
          author {
            name
            title
          }
          slug
          tags
        }
      }
    }

    }
`
