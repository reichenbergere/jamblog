import React from "react"
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"

class PostTemplate extends React.Component {
    render() {
        const post = this.props.data.contentfulPost
        const {previous, next} = this.props.pageContext


        return (
            <Layout>
                <SEO title={post.title} />
                <h1>{post.title}</h1>
                <div dangerouslySetInnerHTML={{__html: post.content.childContentfulRichText.html}} />
            </Layout>
        )
    }
}

  
export default PostTemplate

export const pageQuery = graphql`
    query ContentfulPostBySlug($slug: String!) {
        contentfulPost(id: {eq: $slug}) {
            title
            content{
                childContentfulRichText{
                    html
                }
            }
        }
    }
`