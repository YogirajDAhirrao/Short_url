const express = require("express");
const urlRoute = require("./router/url");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const staticRouter = require("./router/staticRouter");
const app = express();
const path = require("path");
const PORT = 8000;
connectToMongoDB("mongodb://localhost:27017/Short-url").then(() =>
  console.log("connected")
);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", staticRouter);
app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});
app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;

    // Find and update the entry
    const entry = await URL.findOneAndUpdate(
      { shortId }, // Match the document with the given shortId
      {
        $push: {
          visitHistory: { timestamp: Date.now() },
        },
      },
      { new: true } // Return the updated document
    );

    if (!entry) {
      // Handle the case where no matching entry is found
      return res.status(404).send("Short URL not found");
    }

    // Redirect to the URL
    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Error processing shortId:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server started at port - ${PORT}`);
});
