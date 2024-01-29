const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, resp) {
    const body = req.body;
    if (!body.url) return resp.status(400).json({ error: "url is required" });
    const shortID = shortid(8);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],

    });
   return resp.json({ id: shortID });
}

async function handleGetAnalytics (req, resp){
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return resp.json({ 
        totalClicks: result.visitHistory.length, 
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
}