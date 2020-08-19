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
    }
}