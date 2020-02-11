import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class IndexPage extends React.Component {
  render() {
    const posts = this.props.data.allContentfulPost.edges

    return (
      <Layout>
        <SEO title="Home" />
        <h1>Test</h1>
        {posts.map(({node}) => {
          return (
            <Link to={node.id} key={node.id}>
              <h3>{node.title}</h3>
            </Link>
          )
        })}
        <Link to="/page-2/">Go to page 2</Link>
      </Layout>
    )
  } 
}

export default IndexPage
export const pageQuery = graphql`
  query {
      allContentfulPost {
          edges {
              node {
                  id
                  title
                  content{
                      childContentfulRichText{
                          html
                      }
                  }
              }
          }
      }
  }
`
