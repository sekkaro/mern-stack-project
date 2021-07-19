import { verifyAccessJWT } from "../utils/jwt";
import { deleteJWT, getJWT } from "../utils/redis";

export const userAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  const decoded = await verifyAccessJWT(authorization);

  if (decoded.email) {
    const userId = await getJWT(authorization);

    if (!userId) {
      return res.status(403).send({ message: "Forbidden" });
    }

    req.userId = userId;

    return next();
  }

  deleteJWT(authorization);
  return res.status(403).send({ message: "Forbidden" });
};
