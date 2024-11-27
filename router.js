const urlHandler = require("./urlHandler");


const router = (fastify, options) => {
    fastify.get("/", (req, res) => {
        return res.view("./public/index.ejs")
    })

    fastify.post("/generate-url", urlHandler.urlGenerator)

    fastify.get("/:url_generated", urlHandler.urlRedirecter);
}

module.exports = router;