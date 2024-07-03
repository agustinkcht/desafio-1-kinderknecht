async function isOnline(req, res, next) {
  try {
    if (!req.user) {
      return res.err400mes("No session opened. User Offline");
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

export default isOnline;
