import usersRepository from "../repositories/users.rep.js";
import { verifyHash } from "../utils/hash.util.js";

async function isValidPassword(req, res, next) {
  try {
    const { email, password } = req.body;
    const one = await usersRepository.readByEmailRepository(email);
    const verify = verifyHash(password, one.password);
    if (verify) {
      return next();
    } else {
      return res.err401invalidCredentials();
    }
  } catch (err) {
    return next(err);
  }
}

export default isValidPassword;
