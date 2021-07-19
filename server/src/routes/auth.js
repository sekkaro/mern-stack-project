import express from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { errorHandler, throwError } from "../utils/errorHandler";
import { createAccessJWT, createRefreshJWT } from "../utils/jwt";

const router = express.Router();

// register
router.post("/register", async (req, res) => {
  try {
    if (!req.body.password) {
      throwError("password is required", 400);
    }
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      company: req.body.company,
      address: req.body.address,
      phone: req.body.phone,
    });

    // save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    // res.status(500).json(err);
    errorHandler(err, res);
  }
});

// // login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throwError("invalid form", 400);
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      throwError("user not found", 404);
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throwError("wrong password", 403);
    }

    const accessJWT = await createAccessJWT(user.email, `${user._id}`);
    const refreshJWT = createRefreshJWT(user.email);
    res.status(200).json({ accessJWT, refreshJWT });
  } catch (err) {
    errorHandler(err, res);
  }
});

export default router;
