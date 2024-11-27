const { urlDB } = require("../database/collections")
const { v4: uuidv4 } = require('uuid');
const fs = require("fs").promises;

const generated_url_html = "./public/generated-url.ejs"

const findUrl = async (req, url) => {
    return await urlDB(req).findOne({url: url});
}


const findUrlById = async (req, uid) => {
    return await urlDB(req).findOne({url_generated: uid});
}

const generateURL = async (req, res, url) => {
    const getUrl = await urlDB(req).findOne({url: url});
    let generatedURL = "";
    if(getUrl){
        const getUrl = await findUrl(req, url);
        const shortedlink = "127.0.0.1:3000/" + getUrl.url_generated
        return res.viewAsync("/public/result-link.ejs", {url_generated: shortedlink});
    }

    else{
        do {
            generatedURL = uuidv4();
        } while (await findUrlById(req, generatedURL));
        const a = generatedURL.split("-");
        const changedGeneratedUrl = a[0].toString();
        await urlDB(req).insertOne({url: url, url_generated: changedGeneratedUrl});
        const shortedlink = `127.0.0.1:3000/${changedGeneratedUrl}`;
        
        return res.view("/public/result-link.ejs", {url_generated: shortedlink});
    }
    
}

const redirectURL = async (req, res) => {
    const {url_generated} = req.params;
    const getUrl = await findUrlById(req, url_generated);
    let originalLink = getUrl.url;
    if(getUrl){
        let html = fs.readFile(generated_url_html, "utf-8");
        html = (await html).replace("%url_generated%", originalLink);
        return res.type("text/html").send(html);
    }
    else{
        res.status(404).send();
    }
}

module.exports = { findUrl, findUrlById, generateURL, redirectURL };