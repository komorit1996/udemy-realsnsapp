const express = require("express");
const app = express();
const authRouter = require("./routers/auth");
const userRouter = require("./routers/users");
const postsRouter = require("./routers/posts");
const uploadRouter = require("./routers/upload");
const PORT = 3030;
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

// database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Create Connection DB...");
    console.log("コネクションを作成しました。");
  })
  .catch((err) => {
    console.log(err);
  });

// middle ware
app.use("/images", express.static(path.join(__dirname, "public/images"))); // 静的なファイルは puclic/images が起点になるように変更
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/upload", uploadRouter);

// routing
app.get("/", (req, res) => {
  res.send("hello express");
});

// launch server
app.listen(PORT, () => {
  console.log(`Launch server. http://localhost:${PORT}`);
});
