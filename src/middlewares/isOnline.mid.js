async function isOnline(req, res, next) {
  try {
    if (!req.user) {
      return res.err400offline();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

export default isOnline;
