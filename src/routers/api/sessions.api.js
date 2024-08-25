import CustomRouter from "../CustomRouter.js";
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { register, login, logout, online, googleCallback, verifyCode, recoveryCode, resetPassword } from "../../controllers/sessions.controller.js";
import validator from "../../middlewares/joi.mid.js";
import userSchema from "../../dao/schemas/user.schema.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"], validator(userSchema), passportCb("register"), register);
    this.create("/login", ["PUBLIC"], passportCb("login"), login);
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
    this.create("/verify", ["PUBLIC"], verifyCode),
    this.create("/password", ["PUBLIC"], recoveryCode),
    this.update("/password", ["PUBLIC"], resetPassword)
  }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();