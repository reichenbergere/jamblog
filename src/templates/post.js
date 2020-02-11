import React from "react"
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"

class PostTemplate extends React.Component {
    render() {
        const post = this.props.data.contentfulPost
        const {previous, next} = this.props.pageContext
        let comments;

        if (post.comments) {
            comments = <div id="comments">
                {post.comments.comments.map(comment => {
                    return (
                        <p>{comment.comment_text}</p>
                    )
                })}
            </div>
        } else {
            comments = <div id="comments"></div>
        }
        return (
            <Layout>
                <SEO title={post.title} />
                <h1>{post.title}</h1>
                <div dangerouslySetInnerHTML={{__html: post.content.childContentfulRichText.html}} />
                {comments}
            </Layout>
        )
    }
}

  
export default PostTemplate

export const pageQuery = graphql`
    query ContentfulPostBySlug($slug: String!) {
        contentfulPost(contentful_id: {eq: $slug}) {
            title
            content{
                childContentfulRichText{
                    html
                }
            }
            comments {
                comments {
                    comment_text
                }
            }
        }
    }
`