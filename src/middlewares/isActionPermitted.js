import productsRepository from "../repositories/products.rep.js";

async function isManagementPermitted(req, res, next) {
  try {
    const { role } = req.user;
    if (role === 1) {
      // if admin, go ahead
      return next();
    }
    // if PREMIUM, check if the product belongs to them to handle permission
    const uid = req.user._id;
    const { pid } = req.params;
    const product = await productsRepository.readOneRepository(pid);
    if (!product) {
      return res.err404product();
    }
    if (uid.toString() === product.supplier_id._id.toString()) {
      return next();
    } else {
      return res.err403();
    }
  } catch (err) {
    return next(err);
  }
}

async function isPurchasePermitted(req, res, next) {
  try {
    const { role } = req.user;
    if (role === 0) {
      // if normal user
      return next();
    }
    // if PREMIUM, they can´t buy their own products
    const uid = req.user._id;
    const { product_id } = req.body;
    const product = await productsRepository.readOneRepository(product_id);
    if (!product) {
      return res.err404product();
    }
    if (uid.toString() === product.supplier_id._id.toString()) {
      return res.err403();
    } else {
      return next();
    }
  } catch (err) {
    return next(err);
  }
}

export { isManagementPermitted, isPurchasePermitted };
