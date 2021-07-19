import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

const router = express.Router();

// update user
router.put("/:id", async (req, res) => {
  if (req.body.userId !== req.params.id && !req.body.isAdmin) {
    return res.status(403).json("You can update only your account!");
  }

  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Account has been updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId !== req.params.id && !req.body.isAdmin) {
    return res.status(403).json("You can delete only your account!");
  }

  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Account has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId === req.params.id) {
    return res.status(403).json("you cant follow yourself");
  }

  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    if (user.followers.includes(req.body.userId)) {
      return res.status(403).json("you already followed this user");
    }

    await user.updateOne({ $push: { followers: req.body.userId } });
    await currentUser.updateOne({ $push: { followings: req.params.id } });
    res.status(200).json("user has been followed");
  } catch (err) {
    res.status(500).json(err);
  }
});

// unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId === req.params.id) {
    return res.status(403).json("you cant unfollow yourself");
  }

  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    if (!user.followers.includes(req.body.userId)) {
      return res.status(403).json("you already unfollowed this user");
    }

    await user.updateOne({ $pull: { followers: req.body.userId } });
    await currentUser.updateOne({ $pull: { followings: req.params.id } });
    res.status(200).json("user has been unfollowed");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
