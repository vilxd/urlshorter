const { findUrl, redirectURL, generateURL } = require('./models/urlModel');
const urlGenerator = async (req, res) => {
    const {url} = req.body; // get url from user
    return await generateURL(req, res, url);
}

const urlRedirecter = async (req, res) => {
    return redirectURL(req, res);
    

}
module.exports = {

    urlGenerator,
    urlRedirecter

}