import React from "react"
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

class PostTemplate extends React.Component {
    addComment = (e) => {
        e.stopPropagation();
        e.preventDefault();

        fetch('/.netlify/functions/post_comment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: document.getElementById("contentful_id").value,
                comment_text: document.getElementById("comment_text").value
            })
        })
        document.getElementById("contentful_id").value = "";
    }

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
                <Link to="/">
                    <p>Back</p>
                </Link>
                <h1>{post.title}</h1>
                <div dangerouslySetInnerHTML={{__html: post.content.childContentfulRichText.html}} />
                <h3>Post comment:</h3>
                <form onSubmit={this.addComment}>
                    <input type="hidden" id="contentful_id" value={post.contentful_id}/>
                    <textarea id="comment_text" rows="5" cols="80"></textarea><br/>
                    <input type="submit" value="Send"/>
                </form>
                <h3>Comments:</h3>
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
            contentful_id
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