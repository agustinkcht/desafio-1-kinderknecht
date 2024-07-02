import usersRepository from "../repositories/users.rep.js";

async function isValidEmail(req, res, next) {
  try {
    const { email } = req.body;
    const one = await usersRepository.readByEmailRepository(email);
    if (one) {
      res.err409mes(
        "Email already registered. Use a different email or log in"
      );
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

export default isValidEmail;
