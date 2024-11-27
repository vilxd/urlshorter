

const urlDB = (req) => {
    return req.server.mongo.db.collection("urls");
}

module.exports = { urlDB };