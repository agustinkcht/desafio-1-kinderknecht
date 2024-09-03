import jwt from "jsonwebtoken";

const createToken = (data) => {
  try {
    const opts = { expiresIn: 60 * 60 * 24 }; // 1 dia
    const token = jwt.sign(data, process.env.SECRET_JWT, opts);
    return token;
  } catch (err) {
    console.error("Error creating token");
    throw err;
  }
}; // receives object and returns it 'tokenized'. this should be used when starting the session.

const createRecoveryToken = (data) => {
  try {
    const opts = { expiresIn: 180 }; // 3 min
    const recoveryToken = jwt.sign(data, process.env.SECRET_JWT, opts);
    return recoveryToken;
  } catch (err) {
    console.error("Error creating recovery token");
    throw err;
  }
}; // receives a recovery code (hex) and returns it 'tokenized'. this should be used when sending a recovery email for password.

const verifyToken = (token) => {
  try {
    const data = jwt.verify(token, process.env.SECRET_JWT);
    return data;
  } catch (err) {
    console.error("Error verifying token");
    throw err;
  }
}; // receives token and 'de-tokenizes' it, retrieving the de-encrypted data.

export { createToken, createRecoveryToken, verifyToken };
