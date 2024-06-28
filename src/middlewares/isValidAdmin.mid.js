import { verifyToken } from "../utils/token.util.js";

async function isValidAdmin(req, res, next) {
  try {
    const { token } = req.cookies;
    const data = verifyToken(token);
    const { role } = data;
    console.log(role);
    if (role === "1") {
      return next();
    } else {
      const error = new Error("Action not allowed");
      error.statusCode = 403;
      throw error;
    }
  } catch (err) {
    return next(err);
  }
}

export default isValidAdmin;
