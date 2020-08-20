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
       console.log("Req Params", id);
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
        console.log(req.body);
        await db.create_post( req.body )
        res.status(200).send("Post Sent OK")
    }
}