import CustomRouter from "../CustomRouter.js";
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { register, login, logout, online, googleCallback, verifyCode, recoveryCode, resetPassword } from "../../controllers/sessions.controller.js";
import validator from "../../middlewares/joi.mid.js";
import userSchema from "../../dao/schemas/user.schema.js";
import loginSchema from "../../dao/schemas/login.schema.js";
import verificationSchema from "../../dao/schemas/verification.schema.js";
import passwordSchema from "../../dao/schemas/password.schema.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"], validator(userSchema), passportCb("register"), register);
    this.create("/login", ["PUBLIC"], validator(loginSchema), passportCb("login"), login);
    this.read("/online", ["USER", "ADMIN", "PREMIUM"], passportCb("jwt"), online);
    this.create("/logout", ["USER", "ADMIN", "PREMIUM"], passportCb("jwt"), logout);
    this.read("/google",
      ["PUBLIC"],
      passport.authenticate("google", { scope: ["email", "profile"] })
    );
    this.read("/google/callback",
      ["PUBLIC"],
      passport.authenticate("google", { session: false }),
      googleCallback
    );
    this.create("/verify", ["PUBLIC"], validator(verificationSchema), verifyCode),
    this.create("/password", ["PUBLIC"], recoveryCode),
    this.update("/password", ["PUBLIC"], validator(passwordSchema), resetPassword)
  }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();