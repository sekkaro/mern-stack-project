import express from "express";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import User from "../models/User";
import Reset from "../models/Reset";
import { errorHandler, throwError } from "../utils/errorHandler";
import {
  createAccessJWT,
  createRefreshJWT,
  verifyRefreshJWT,
} from "../utils/jwt";
import { userAuth } from "../middlewares/authorization";
import { createResetPin } from "../utils/createResetPin";
import { sendEmail } from "../utils/email";
import { redisDelete, redisGet, redisSet } from "../utils/redis";
import { FORGET_PASSWORD_PREFIX } from "../constants";

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

// login
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
    const refreshJWT = await createRefreshJWT(user.email, `${user._id}`);
    res.status(200).json({ accessJWT, refreshJWT });
  } catch (err) {
    errorHandler(err, res);
  }
});

// me
router.get("/me", userAuth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
      throwError("user not found", 404);
    }

    res.status(200).json(user);
  } catch (err) {
    errorHandler(err, res);
  }
});

// refresh token
router.get("/refresh-token", async (req, res) => {
  const { authorization } = req.headers;

  const decoded = await verifyRefreshJWT(authorization);

  if (decoded.email) {
    const user = await User.findOne({
      email: decoded.email,
    });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    let tokenExp = user.refreshJWT.addedAt;
    const refreshToken = user.refreshJWT.token;

    tokenExp = tokenExp.setDate(
      tokenExp.getDate() + +process.env.JWT_REFRESH_SECRET_EXP_DAY
    );

    const today = new Date();

    if (refreshToken !== authorization || tokenExp < today) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const accessJWT = await createAccessJWT(decoded.email, `${user._id}`);

    return res.status(200).json({ accessJWT });
  }

  res.status(403).json({ message: "Forbidden" });
});

router.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const token = v4();
    await redisSet(FORGET_PASSWORD_PREFIX + token, user.id, 60 * 60 * 24);
    sendEmail(email, `${process.env.HOST}/change-password/${token}`);
    // const pin = createResetPin(6);
    // const reset = new Reset({
    //   email,
    //   pin,
    // });

    // await reset.save();

    // sendEmail(email, pin);
  }

  res.status(200).json({
    message:
      "If the email exists, the password reset pin will be sent shortly.",
  });
});

router.post("/change-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const key = FORGET_PASSWORD_PREFIX + token;

    const userId = await redisGet(key);

    if (!userId) {
      throwError("expired token", 401);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          password: hashedPassword,
        },
      },
      { new: true }
    );

    redisDelete(key);

    res.status(200).json({
      message: "password reset successful",
    });
  } catch (err) {
    errorHandler(err, res);
  }
});

export default router;
