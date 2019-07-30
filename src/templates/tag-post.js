import React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
// import './index.css'
import Navbar from '../components/navigation/navbar'
import Footer from '../components/navigation/footer'


class TaggedBlogIndex extends React.Component {
    render() {
      const { data } = this.props
      
    //   const siteTitle = data.allContentfulBlog.tags + ' Posts'// data.site.siteMetadata.title
      const posts = data.allContentfulBlog.edges

      return (
        <React.Fragment>
          <Navbar />
          <Layout location={this.props.location} title={siteTitle}>
            <SEO title="All posts" />
            <Bio />
            <div className='row'>
                {posts.map(({ node, i }) => {
                  const title = node.blogTitle || node.slug
                  const thumbnail = node.thumbnail
                  return (
                      <div
                      style={{
                        marginLeft: `auto`,
                        marginRight: `auto`,
                        // maxWidth: rhythm(40),
                        // padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
                      }}
                      className='leftColumn'
                      key={node.slug}
                      >
                        <h3
                          style={{
                            marginBottom: rhythm(2 / 4),
                          }}
                        >
                          <Link style={{color:"rgb(15, 52, 53)", boxShadow: `none` }} to={node.slug}>
                            {title}
                          </Link>
                        </h3>
                        <Link style={{color:"rgb(15, 52, 53)", boxShadow: `none` }} to={node.slug}>
                          <img src={thumbnail.fixed.srcWebp} alt={thumbnail.description} key={i}/>
                        </Link>
                        <p>Von <span style={{color:'#028489'}}>{node.author.name}, {node.author.title}</span></p>
                        <p>Published on {node.publishTime}</p>
                        <p>{node.summary}</p>
                        {node.tags.map(tag => (
                        <Link to={node.tag}>
                          <p style={{"fontFamily":"Roboto","color":"#028489","textDecoration":"none","display":"inline-block","padding":".33333rem .5rem","lineHeight":"1","borderRadius":"2px","border":"1px solid #028489","marginRight":".5em"}} key={tag}>  
                            {tag}
                          </p>
                        </Link>
                      ))}
                  </div>
                  )})}
            </div>
          </Layout>
         <Footer /> 
        </React.Fragment>
      )
  }
  }

export default TaggedBlogIndex


export const pageQuery = graphql`
query($tag: String) {

  allContentfulBlog (sort: {fields: publishTime, order: DESC}, filter: { tags: { in:[$tag] } } ) {
    edges {
      node {
        blogTitle
        summary
        author {
          name
          title
        }
        thumbnail {
          description
          fixed {
            srcWebp
          }
        }
        publishTime (formatString: "DD / MM / YY ")
        slug
        tags
      }
    }
  }
  }
`