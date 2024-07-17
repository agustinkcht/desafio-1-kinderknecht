async function isOffline(req, res, next) {
  try {
    if (!req.user) {
      return next();
    }
    return res.err400online();
  } catch (err) {
    return next(err);
  }
}

export default isOffline;
