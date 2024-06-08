import CustomRouter from "../CustomRouter.js";
//import productManager from "../../data/fs/files/ProductManager.fs.js";
import productManager from "../../data/mongo/managers/ProductManager.mongo.js";
import isValidAdmin from "../../middlewares/isValidAdmin.mid.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN"], isValidAdmin, create);
    this.read("/", ["PUBLIC"], read);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.update("/:pid", ["ADMIN"], update);
    this.destroy("/:pid", ["ADMIN"], destroy);
  }
}

const productsRouter = new ProductsRouter();

//functions
async function create(req, res, next) {
  try {
    const data = req.body;
    const newProduct = await productManager.create(data);
    return res.suc200mes(`Product created successfully with id ${newProduct.id}`);
  } catch (err) {
    return next(err);
  }
}
async function read(req, res, next) {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.title) {
      filter.title = new RegExp(req.query.title, "i");
    }
    const opts = {
      limit: parseInt(req.query.limit) || 3,
      page: parseInt(req.query.page) || 1,
    };
    const all = await productManager.paginate({ filter, opts });
    const paginateInfo = {
      page: all.page,
      totalPages: all.totalPages,
      limit: all.limit,
      prevPage: all.prevPage,
      nextPage: all.nextPage,
      totalDocs: all.totalDocs,
    };
    const response = all.docs;
    return res.suc200respag(response, paginateInfo);
  } catch (err) {
    return next(err);
  }
} // con paginate
async function readOne(req, res, next) {
  try {
    const { pid } = req.params;
    const selected = await productManager.readOne(pid);
    if (selected) {
      return res.suc200res(selected);
    } else {
      res.err404();
    };
  } catch (err) {
    return next(err);
  }
}
async function update(req, res, next) {
  try {
    const { pid } = req.params;
    const data = req.body;
    const updatedProduct = await productManager.update(pid, data);
    return res.suc200res(updatedProduct);
  } catch (err) {
    return next(err);
  }
}
async function destroy(req, res, next) {
  try {
    const { pid } = req.params;
    const deletedProduct = await productManager.destroy(pid);
    return res.suc200mesres("Product deleted successfully", deletedProduct);
  } catch (err) {
    return next(err);
  }
}

export default productsRouter.getRouter();
