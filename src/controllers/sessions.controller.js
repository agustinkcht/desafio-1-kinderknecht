import {
  readByEmailService,
  updateService,
} from "../services/users.service.js";

class SessionsController {
  async register(__req, res, next) {
    try {
      return res.suc201mes("User successfully registered");
    } catch (err) {
      return next(err);
    }
  }
  async login(req, res, next) {
    try {
      return res
        .cookie("token", req.user.token, { signedCookie: true })
        .suc200mes("Session Initialized");
    } catch (err) {
      return next(err);
    }
  }
  async online(req, res, next) {
    try {
      if (req.user && req.user.online) {
        // req.user brought from the payload extracted from the token in the 'jwt' midd.
        return res.suc200online(req.user._id, req.user.email, req.user.role);
      } else {
        return res.err401offline();
      }
    } catch (err) {
      return next(err);
    }
  }
  async logout(req, res, next) {
    try {
      if (req.user.online) {
        return res.clearCookie("token").suc200mes("Session Closed");
      } else {
        return res.err401noSession();
      }
    } catch (err) {
      return next(err);
    }
  }
  async googleCallback(req, res, next) {
    try {
      return res.suc200mes("Logged In With Google");
    } catch (err) {
      return next(err);
    }
  }
  async verifyCode(req, res, next) {
    // take the data coming from the VERIFY FORM ( or postman )
    // compare the code introduced with the verifyCode of the user (should be ===)
    try {
      const { email, code } = req.body; 
      const one = await readByEmailService(email);
      const verified = code === one.verificationCode; // returns boolean
      if (!verified) { // false
        return res.err400invalidCode();
      } // if true:
      await updateService(one._id, { verified: true }); // turn the verify to true.
      return res.suc200mes("User Verified");
    } catch (err) {
      return next(err);
    }
  }
}

const sessionsController = new SessionsController();

const { register, login, online, logout, googleCallback, verifyCode } =
  sessionsController;
export { register, login, online, logout, googleCallback, verifyCode };
