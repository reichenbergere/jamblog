const path = require('path');

exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions

    const blogPost = path.resolve('./src/templates/post.js');
    return graphql(
        `
            {
                allContentfulPost {
                    edges {
                        node {
                            contentful_id
                            title
                            comments {
                                comments {
                                    comment_text
                                }
                            }
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
    ).then(result => {
        const posts = result.data.allContentfulPost.edges;
        
        posts.forEach((post, index) => {
            const previous = index === posts.length - 1 ? null : posts[index + 1].node;
            const next = index === 0 ? null : posts[index - 1].node;

            createPage({
                path: post.node.contentful_id,
                component: blogPost,
                context: { 
                    slug: post.node.contentful_id,
                    previous,
                    next,
                }
            })
        })
    })
}