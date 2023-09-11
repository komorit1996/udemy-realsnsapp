const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// Get All Post
router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.find();

    const formattedPosts = allPosts.map((post) => ({
      id: post._id,
      userId: post.userId,
      img: post.img,
      desc: post.desc,
    }));
    return res.status(200).json(formattedPosts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Get Specified Post
router.get("/:id", async (req, res) => {
  const SpecifiedPost = await Post.findById(req.params.id);
  try {
    return res.status(200).json(SpecifiedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Create Post
router.post("/", async (req, res) => {
  const newPost = new Post({
    userId: req.body.userId,
    desc: req.body.desc,
    img: req.body.img,
    likes: req.body.likes,
  });

  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Update Post
router.put("/:id", async (req, res) => {
  // ID = post ID
  const post = await Post.findById(req.params.id);
  // 投稿したユーザーではない場合、更新ができない
  if (post.userId === req.body.userId) {
    try {
      const post = await Post.updateOne({ $set: req.body });
      res.status(200).json("Success: Update Posts.");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json({ error: "Filed: Only Change Your Self Posts." });
  }
});

// Delete Post
router.delete("/:id", async (req, res) => {
  // ID = post ID
  const post = await Post.findById(req.params.id);
  // Delete your posts
  if (post.userId === req.body.userId) {
    try {
      const post = await Post.deleteOne();
      res.status(200).json("Success: Delete Posts.");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json({ error: "Filed: Only Change Your Self Posts." });
  }
});

// 投稿に対して Likeを行う
router.put("/:id/like", async (req, res) => {
  const likePostID = req.params.id; // Like -up side
  const currentUserId = req.body.userId; // Those to be like

  try {
    // Is it a state where the like has not been pushed yet?
    const postData = await Post.findById(likePostID);
    const alreadyLike = postData.likes.includes(currentUserId);

    if (!alreadyLike) {
      // like push userID
      await Post.updateOne(
        { _id: likePostID },
        {
          $push: { likes: currentUserId },
        }
      );
      return res.status(200).json("You Successfully Like.");
    } else {
      // like remove userID
      await Post.updateOne(
        { _id: likePostID },
        {
          $pull: { likes: currentUserId },
        }
      );
      return res.status(200).json("You Successfully Remove Like.");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 指定したユーザーの投稿をすべて取得する
router.get("/timeline/current/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    // 自分の投稿をすべて取得する
    const posts = await Post.find({ userId: user._id });
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 自分とフォローしているユーザーすべての投稿を取得する
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });

    // 自分がフォローしているユーザーの投稿をすべて取得する
    const friendIDs = currentUser.followings;
    const friendsPosts = await Promise.all(
      friendIDs.map((friendID) => Post.find({ userId: friendID }))
    );

    const timeline = userPosts.concat(...friendsPosts);

    return res.status(200).json(timeline);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Export
module.exports = router;
