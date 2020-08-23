module.exports = {
    getAllPosts: async (req, res) => {
        console.log("Get All Posts Called");
        const db = req.app.get('db');
        await db.get_all_posts().then( posts => {
                res.status(200).send( posts )
                //console.log("Sending: ", posts);
            } )
            .catch(err => {
                res.status(500).send({ errorMessage: "Error Getting Posts" });
                console.log(err)
            });
    },

    getPost: async (req, res) => {
        console.log("Get Post Called");
        const db = req.app.get('db');
        const id = +req.params.id;
        await db.get_post( [id] ).then( post => {
            res.status(200).send( post )
            console.log("Sending: ", post);
        } )
        .catch(err => {
            res.status(500).send({ errorMessage: `Error Getting Post ID: ${id}`});
            console.log(err)
        });
    },

    createPost: async (req, res) => {
        console.log("Create Post Called");
        const db = req.app.get('db');
        const { title, img, content, author_id } = req.body;
        await db.create_post( req.body )
        res.status(200).send("Post Sent OK")
    },

    editPost: async (req, res) => {
        console.log("Edit Post Called");
        const db = req.app.get('db');
        const [ title, img, content ] = req.body;
        const id = +req.params.id;
        await db.edit_post( [id, title, img, content] )
            res.status(200).send("Post Sent OK")
    },

    deletePost: async (req, res) => {
        console.log("Delete Post Called");
        const db = req.app.get('db');
        const id = +req.params.id;
        await db.delete_post( [id] )
            .then( posts => {
                res.status(200).send( posts )
                //console.log("Sending: ", posts);
            } )
            .catch(err => {
                res.status(500).send({ errorMessage: `Error Deleting Post ID: ${id}`});
                console.log(err)
        });
    
    },

    searchPostTitle: async (req, res) => {
        console.log("Title Query Called");
        const db = req.app.get('db');
        const searchTerm = req.query.title;
        const queryTerm = `%${searchTerm}%`;
        await db.search_title( [ queryTerm ] )
            .then( posts => {
                res.status(200).send( posts )
                console.log("Returning: ", posts)
            })
            .catch(err => {
                res.status(500).send({ errorMessage: "Error Finding Title"});
                console.log(err)
            });
    }
}