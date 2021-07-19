import jwt from "jsonwebtoken";

export const createAccessJWT = (payload) =>
  jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });

export const createRefreshJWT = (payload) =>
  jwt.sign({ payload }, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
