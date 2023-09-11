const router = require("express").Router();
// const User = require("../models/User");
const multer = require("multer");

// ファイルの保存先と名前を設定
const storage = multer.diskStorage({
  // 保存先
  destination: (req, file, cb) => {
    cb(null, "public/images/post");
  },
  // file名
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });

// ファイルのアップロード
// upload.single("file") はキー名
router.post("/", upload.single("file"), async (req, res) => {
  try {
    return res.status(200).json("Succsess!");
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
