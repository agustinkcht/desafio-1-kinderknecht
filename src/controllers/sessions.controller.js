class SessionsController {
  async register(req, res, next) {
    try {
      return res.suc200mes("User successfully registered");
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
        return res.err401mes("Offline");
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
        return res.err401mes("No session opened");
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
}

const sessionsController = new SessionsController();

const { register, login, online, logout, googleCallback } = sessionsController;
export { register, login, online, logout, googleCallback };