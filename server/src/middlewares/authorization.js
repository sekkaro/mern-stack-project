import { verifyAccessJWT } from "../utils/jwt";
import { getJWT } from "../utils/redis";

export const userAuth = async (req, res, next) => {
  try {
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

    return res.status(403).send({ message: "Forbidden" });
  } catch (err) {
    // console.log(err);
    return res.status(403).send({ message: "Forbidden" });
  }
};
