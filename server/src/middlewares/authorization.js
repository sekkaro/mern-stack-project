import { verifyAccessJWT } from "../utils/jwt";
import { redisDelete, redisGet } from "../utils/redis";

export const userAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  const decoded = await verifyAccessJWT(authorization);

  if (decoded.email) {
    const userId = await redisGet(authorization);

    if (!userId) {
      return res.status(403).send({ message: "Forbidden" });
    }

    req.userId = userId;

    return next();
  }

  redisDelete(authorization);
  return res.status(403).send({ message: "Forbidden" });
};
