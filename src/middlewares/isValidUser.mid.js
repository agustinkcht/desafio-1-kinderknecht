import usersRepository from "../repositories/users.rep.js";

async function isValidUser(req, res, next) {
  try {
    const { email } = req.body;
    const one = await usersRepository.readByEmailRepository(email);
    if (!one) {
      return res.err401invalidCredentials();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

export default isValidUser;
