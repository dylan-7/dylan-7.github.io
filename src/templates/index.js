import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
// 数据来源是 createPage 注入的上下文变量
const { totalPage, currentPage } = this.props.pageContext

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div>
              <div>
                {currentPage - 1 > 0 && (
                  <Link
                    to={'/blog/' + (currentPage - 1 === 1 ? '' : currentPage - 1)}
                    rel="prev"
                  >
                    ← 上一页
                  </Link>
                )}
              </div>
              <div>
                {currentPage + 1 <= totalPage && (
                  <Link to={'/blog/' + (currentPage + 1)} rel="next">
                    下一页 →
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
