const access_token = 'CFPAT-0wIuz_eoA4_mD_d0luwqgT0dJYUD5SsmDH2V-KgrY8w'
const contentful = require("contentful-management")

exports.handler = function(event, context, callback) {
    async function main() {
        const data = JSON.parse(event.body);
        console.log(data);
        let postComments = [];

        const client = contentful.createClient({
            accessToken: access_token
        });

        console.log("Getting client");
        await client.getSpace('e2o6u0moecci')
        .then(space => {
            return space.getEnvironment('master')
        })
        .then(environment => {
            return environment.getEntry(data.id)
        })
        .then(entry => {
            console.log(entry);
            if (entry.fields.comments) {
                entry.fields.comments["en-US"].comments.forEach(comment => {
                    postComments.push(comment)
                })
            }

            postComments.push({
                comment_text: data.comment_text
            })
        });
        console.log("Getting client 2", postComments);
        await client.getSpace('e2o6u0moecci')
        .then(space => {
            return space.getEnvironment('master')
        })
        .then(environment => {
            return environment.getEntry(data.id)
        })
        .then(entry => {
            if (!entry.fields.comments) {
                entry.fields.comments = {
                    "en-US": {
                        comments: []
                    }
                };
            }
            entry.fields.comments["en-US"] = {
                comments: postComments
            }
            console.log("Updating entry", entry);
            return entry.update();
        });

        callback(null, {
            statusCode: 200,
            body: JSON.stringify(postComments)
        });
    }

    main().catch(console.error);
}