import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// const Post = ({document}) => {
//     console.log('document: ', document)
//     const options = {
//     renderNode: {
        
//         [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
//         [BLOCKS.HEADING_2]: (node, children) => ( <h2>{children}</h2>),
//         [BLOCKS.EMBEDDED_ASSET]: (node) => {
//             console.log("node value: ", node)
//             const {title, description, file} = node.data.target.fields;
//             console.log(title, description, file);
//             return <img src={file["de-DE"].url} />
//         },
//         [BLOCKS.UL_LIST]: (node, children) => ( <div>{children}</div>),
//         [BLOCKS.HYPERLINK]: (node, children) => {
//         },
//     },
//     renderMark: {
//         [MARKS.BOLD]: (node, children) => (<span>{children}</span>),
//         [MARKS.ITALIC]: (node,children) => (<span>{children}</span>),
//         [MARKS.UNDERLINE]: (node,children) => (<span>{children}</span>)
//     }
//     };

//     const post = documentToReactComponents(document && document.fields.body, options,);

//     return (
//         <div>
//             <h1>{document.fields.BlogTitle}</h1>
//             {post}
//         </div>
//     )
// }

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.contentfulBlog
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const richText = post.content.json
    console.log("rich text", richText)

    const options = {
      renderNode: {  
        [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
        [BLOCKS.HEADING_2]: (node, children) => ( <h2>{children}</h2>),
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
            console.log("node value: ", node)
            const {title, description, file} = node.data.target.fields;
            console.log(title, description, file);
            return <img src={file["de-DE"].url} />
        },
        [BLOCKS.UL_LIST]: (node, children) => ( <div>{children}</div>),
        // [BLOCKS.HYPERLINK]: (node, children) => {

        // },
    },
    renderMark: {
        [MARKS.BOLD]: (node, children) => (<span>{children}</span>),
        [MARKS.ITALIC]: (node,children) => (<span>{children}</span>),
        [MARKS.UNDERLINE]: (node,children) => (<span>{children}</span>)
    }
    };

    console.log(documentToReactComponents(richText, options));

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.blogTitle}
          description={post.summary}
        />
        <h1
          style={{
            marginTop: rhythm(1),
            marginBottom: 0,
          }}
        >
          {post.blogTitle}
        </h1>
        {/* <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
          }}
        >
          {post.frontmatter.date}
        </p> */}
        {/* <div dangerouslySetInnerHTML={{ __html: post.html }} /> */}
        {documentToReactComponents(richText, options)}
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.slug} rel="prev">
                ← {previous.blogTitle}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.slug} rel="next">
                {next.blogTitle} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlog( slug: { eq: $slug}) {
      blogTitle
      summary
      content {
        json
      }
    }
    contentfulPerson(blog: {elemMatch: {slug: {eq: $slug}}}) {
      name
      title
      company
      shortBio {
        shortBio
      }
    }
  }
`
