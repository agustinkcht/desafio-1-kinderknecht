async function isOffline(req, res, next) {
  try {
    if (!req.user) {
      return next();
    }
    return res.err400mes("Session already opened. User online.");
  } catch (err) {
    return next(err);
  }
}

export default isOffline;
