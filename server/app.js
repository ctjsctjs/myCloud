const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const tasksRoutes = require("./routes/tasks");
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const bookmarksRoutes = require("./routes/bookmarks");
const desktopsRoutes = require("./routes/desktops");

const app = express();

mongoose
  .connect(
    "mongodb://ctjs:" +
    process.env.MONGO_MLAB_PW +
    "@ds119652.mlab.com:19652/sandbox", { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to Database")
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
})
app.use("/api/tasks", tasksRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/bookmarks", bookmarksRoutes);
app.use("/api/desktops", desktopsRoutes);

module.exports = app;
