import {
  createService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
} from "../services/products.service.js";

//functions
class ProductsController {
  async create(req, res, next) {
    try {
      const data = req.body;
      const newProduct = await createService(data);
      return res.suc200mes(
        `Product created successfully with id ${newProduct.id}`
      );
    } catch (err) {
      return next(err);
    }
  }
  async read(req, res, next) {
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
      const all = await paginateService({ filter, opts });
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
  async readOne(req, res, next) {
    try {
      const { pid } = req.params;
      const selected = await readOneService(pid);
      if (selected) {
        return res.suc200res(selected);
      } else {
        res.err404();
      }
    } catch (err) {
      return next(err);
    }
  }
  async update(req, res, next) {
    try {
      const { pid } = req.params;
      const data = req.body;
      const updatedProduct = await updateService(pid, data);
      return res.suc200res(updatedProduct);
    } catch (err) {
      return next(err);
    }
  }
  async destroy(req, res, next) {
    try {
      const { pid } = req.params;
      const deletedProduct = await destroyService(pid);
      return res.suc200mesres("Product deleted successfully", deletedProduct);
    } catch (err) {
      return next(err);
    }
  }
}

const productsController = new ProductsController();

const { create, read, readOne, update, destroy } = productsController;
export { create, read, readOne, update, destroy };
