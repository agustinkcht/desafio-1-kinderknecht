import {
  readByEmailService,
  updateService,
} from "../services/users.service.js";
import { sendRecoveryEmail } from "../utils/mailing.util.js";
import crypto from "crypto";
import { createRecoveryToken, verifyToken } from "../utils/token.util.js";
import usersRepository from "../repositories/users.rep.js";
import { createHash } from "../utils/hash.util.js";

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
      if (!verified) {
        // false
        return res.err400invalidCode();
      } // if true:
      await updateService(one._id, { verified: true }); // turn the verify to true.
      return res.suc200mes("User Verified");
    } catch (err) {
      return next(err);
    }
  }
  async recoveryCode(req, res, next) {
    try {
      const { email } = req.body;
      const user = await usersRepository.readByEmailRepository(email);
      if (!user) {
        return res.err404user();
      }
      const recoveryCode = crypto.randomBytes(12).toString("hex");
      await sendRecoveryEmail({
        to: email,
        code: recoveryCode,
      });
      const data = {
        email: email,
        code: recoveryCode,
      };
      const recoveryToken = createRecoveryToken(data);
      return res
        .cookie("recoveryToken", recoveryToken, { signedCookie: true })
        .suc200mes("Recovery code sent. Please check your email.");
    } catch (err) {
      return next(err);
    }
  }
  async resetPassword(req, res, next) {
    try {
      const { code, password } = req.body;
      const { recoveryToken } = req.cookies;
      const data = verifyToken(recoveryToken);
      const verified = code === data.code;
      if (!verified) {
        return res.err400invalidCode();
      }
      const user = await usersRepository.readByEmailRepository(data.email);
      const uid = user._id;
      const hashPassword = createHash(password);
      const userWithUpdatedPassword = await usersRepository.updateRepository(
        uid,
        { password: hashPassword }
      );
      return res
        .clearCookie("recoveryToken")
        .suc200mes("Password updated successfully");
    } catch (err) {
      return next(err);
    }
  }
}

const sessionsController = new SessionsController();

const {
  register,
  login,
  online,
  logout,
  googleCallback,
  verifyCode,
  recoveryCode,
  resetPassword,
} = sessionsController;
export {
  register,
  login,
  online,
  logout,
  googleCallback,
  verifyCode,
  recoveryCode,
  resetPassword,
};
