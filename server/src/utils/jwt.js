import jwt from "jsonwebtoken";
import { setJWT } from "./redis";

export const createAccessJWT = async (email, id) => {
  const accessJWT = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  await setJWT(accessJWT, id);

  return accessJWT;
};

export const createRefreshJWT = (payload) =>
  jwt.sign({ payload }, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
