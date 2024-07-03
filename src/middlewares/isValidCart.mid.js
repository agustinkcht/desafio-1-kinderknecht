async function isValidCart(req, res, next) {
  try {
    const { user_id, product_id, quantity } = req.body;
    if (!user_id) {
      return res.err400mes("The user ID must be specified");
    }
    if (!product_id) {
      return res.err400mes("The product must be specified");
    }
    if (!quantity) {
      return res.err400mes("Quantity must be specified");
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

export default isValidCart;