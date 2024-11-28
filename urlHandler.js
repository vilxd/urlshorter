const { findUrl, redirectURL, generateURL } = require('./models/urlModel');
const urlGenerator = async (req, res) => {
    const {url} = req.body; // get url from user
    return await generateURL(req, res, url);
}

const urlRedirecter = async (req, res) => {
    const {url_generated} = req.params;
    return redirectURL(req, res, url_generated);
    

}
module.exports = {

    urlGenerator,
    urlRedirecter

}