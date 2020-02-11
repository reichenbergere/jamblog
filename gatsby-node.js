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
    ).then(result => {
        const posts = result.data.allContentfulPost.edges;
        console.log(posts);
        posts.forEach((post, index) => {
            console.log("ID", post.id);
            const previous = index === posts.length - 1 ? null : posts[index + 1].node;
            const next = index === 0 ? null : posts[index - 1].node;

            createPage({
                path: post.node.id,
                component: blogPost,
                context: { 
                    slug: post.node.id,
                    previous,
                    next,
                }
            })
        })
    })
}