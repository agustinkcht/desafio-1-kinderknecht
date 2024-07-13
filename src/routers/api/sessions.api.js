import CustomRouter from "../CustomRouter.js";
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { register, login, logout, online, googleCallback, verifyCode } from "../../controllers/sessions.controller.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"], passportCb("register"), register);
    this.create("/login", ["PUBLIC"], passportCb("login"), login);
    this.read("/online", ["USER", "ADMIN"], passportCb("jwt"), online);
    this.create("/logout", ["USER", "ADMIN"], passportCb("jwt"), logout);
    this.read("/google",
      ["PUBLIC"],
      passport.authenticate("google", { scope: ["email", "profile"] })
    );
    this.read("/google/callback",
      ["PUBLIC"],
      passport.authenticate("google", { session: false }),
      googleCallback
    );
    this.create("/verify", ["PUBLIC"], verifyCode)
  }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();