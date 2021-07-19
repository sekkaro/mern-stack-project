import jwt from "jsonwebtoken";
import User from "../models/User";
import { setJWT } from "./redis";

export const createAccessJWT = async (email, id) => {
  const accessJWT = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  await setJWT(accessJWT, id);

  return accessJWT;
};

export const createRefreshJWT = async (email, id) => {
  const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  // store user refresh jwt
  await User.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        "refreshJWT.token": refreshJWT,
        "refreshJWT.addedAt": Date.now(),
      },
    },
    { new: true }
  );

  return refreshJWT;
};

export const verifyAccessJWT = (token) => {
  try {
    return Promise.resolve(jwt.verify(token, process.env.JWT_ACCESS_SECRET));
  } catch (err) {
    return Promise.reject(err);
  }
};
