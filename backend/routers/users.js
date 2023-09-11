const express = require("express");
const User = require("../models/User");
const router = express.Router();

// CRUD
// User Update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      // $set is all setting user schema.
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json(`Update User Success. ${user}`);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json({ error: "403 Forbidden. Only Change Your Self." });
  }
});

// User Delete test almost there
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete User Success.");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json({ error: "403 Forbidden. Only Change Your Self." });
  }
});

// Get All User
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Get UserInfo
/*
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // Destructuring_assignment
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});
*/

// クエリで Get UserInfo
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });

    // const user = await User.findById(req.params.id);
    // Destructuring_assignment

    if (!user) {
      return res.status(404).json({ message: "ユーザーが見つかりません" });
    }

    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// User Follow > userId = followed id
router.put("/:id/follow", async (req, res) => {
  const followedUserId = req.params.id; // フォローする側
  const currentUser = req.body.userId; // フォローされる側

  if (followedUserId === currentUser) {
    return res
      .status(403)
      .json({ error: "403 Forbidden. Cannot Follow Yourself." });
  }

  try {
    const user = await User.findById(followedUserId);
    const alreadyFollowing = user.followers.includes(currentUser);

    if (!alreadyFollowing) {
      await Promise.all([
        User.updateOne(
          { _id: followedUserId },
          { $push: { followers: currentUser } }
        ),
        User.updateOne(
          { _id: currentUser },
          { $push: { followings: followedUserId } }
        ),
      ]);
      return res.status(200).json("You Successfully Followed.");
    } else {
      return res.status(403).json("You are already following this user.");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Un following User
router.put("/:id/unfollow", async (req, res) => {
  const followedUserId = req.params.id; // to un follow
  const currentUser = req.body.userId; // to be un follow

  if (followedUserId === currentUser) {
    return res
      .status(403)
      .json({ error: "403 Forbidden. Cannot Follow Yourself." });
  }

  try {
    const user = await User.findById(followedUserId);
    const alreadyFollowing = user.followers.includes(currentUser);

    if (alreadyFollowing) {
      // require follow
      await Promise.all([
        User.updateOne(
          { _id: followedUserId },
          { $pull: { followers: currentUser } }
        ),
        User.updateOne(
          { _id: currentUser },
          { $pull: { followings: followedUserId } }
        ),
      ]);
      return res.status(200).json("You Successfully Un Followed.");
    } else {
      return res.status(403).json("You are already Un following this user.");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// export
module.exports = router;
