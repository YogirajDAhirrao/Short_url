const { nanoid } = require("nanoid");
const URL = require("../models/url");
const handleGenerateNewShortUrl = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = nanoid(8);
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.render("home", { id: shortID });
  //res.json({ id: shortID });
};
const handleGetAnalytics = async (req, res) => {
  const shortID = req.params.shortId;
  const result = await URL.findOne({ shortID });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};
module.exports = { handleGenerateNewShortUrl, handleGetAnalytics };
