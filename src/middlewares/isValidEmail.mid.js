import usersRepository from "../repositories/users.rep.js";

async function isValidEmail(req, res, next) {
  try {
    const { email } = req.body;
    const one = await usersRepository.readByEmailRepository(email);
    if (one) {
      res.err409emailAlreadyTaken()
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

export default isValidEmail;
