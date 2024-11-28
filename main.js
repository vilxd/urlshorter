const path = require("path");

const fastify = require("fastify")({logger: true});
fastify.register(require("@fastify/formbody"));
fastify.register(require("@fastify/mongodb"), {
    url: "mongodb+srv://user123:lox123123@cluster0.eckoe.mongodb.net/urlshorter?retryWrites=true&w=majority&appName=Cluster0"
})

fastify.register(require("@fastify/view"), {
    engine: {
        ejs: require("ejs")
    }
})

fastify.register(require("./router"));


fastify.listen({port: process.env.PORT || 10000, host:"0.0.0.0"}, (err) => {
    if(err) throw err;
})