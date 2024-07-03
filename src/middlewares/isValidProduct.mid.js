async function isValidProduct(req, res, next) {
  try {
    const { title } = req.body;
    if (!title) {
      return res.err400mes("Insert product title");
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

export default isValidProduct;
