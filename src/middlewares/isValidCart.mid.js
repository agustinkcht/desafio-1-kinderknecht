async function isValidCart(req, res, next) {
  try {
    const { user_id, product_id, quantity } = req.body;
    if (!user_id) {
      return res.err400missingFieldsUserId();
    }
    if (!product_id) {
      return res.err400missingFieldsProduct();
    }
    if (!quantity) {
      return res.err400missingFieldsQuantity();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

export default isValidCart;