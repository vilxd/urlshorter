const path = require("path");

const fastify = require("fastify")({logger: true});
fastify.register(require("@fastify/formbody"));
fastify.register(require("@fastify/mongodb"), {
    url: "mongodb://localhost:27017/urlshorter"
})

fastify.register(require("@fastify/view"), {
    engine: {
        ejs: require("ejs")
    }
})

fastify.register(require("./router"));


fastify.listen({port: 3000}, (err) => {
    if(err) throw err;
})