import CustomRouter from "../CustomRouter.js";
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";

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
  }
}

async function register(req, res, next) {
  try {
    return res.suc200mes("User successfully registered");
  } catch (err) {
    return next(err);
  }
}
async function login(req, res, next) {
  try {
    return res
      .cookie("token", req.user.token, { signedCookie: true })
      .suc200mes("Session Initialized");
  } catch (err) {
    return next(err);
  }
}
async function online(req, res, next) {
  try {
    if (req.user && req.user.online) {
      // req.user brought from the payload extracted from the token in the 'jwt' midd.
      return res.suc200online(req.user._id, req.user.email, req.user.role);
    } else {
      return res.err401mes("Offline");
    }
  } catch (err) {
    return next(err);
  }
}
async function logout(req, res, next) {
  try {
    if (req.user.online) {
      return res
        .clearCookie("token")
        .suc200mes("Session Closed");
    } else {
      return res.err401mes("No session opened");
    }
  } catch (err) {
    return next(err);
  }
}
async function googleCallback(req, res, next) {
  try {
    return res.suc200mes("Logged In With Google")
  } catch (err) {
    return next(err);
  }
}

const sessionsRouter = new SessionsRouter();

export default sessionsRouter.getRouter();
