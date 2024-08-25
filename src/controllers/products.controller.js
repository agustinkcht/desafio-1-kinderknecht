import {
  createService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
} from "../services/products.service.js";
import argsUtil from "../utils/args.util.js";
import usersRepository from "../repositories/users.rep.js";

//functions
class ProductsController1 {
  async create(req, res, next) {
    try {
      const data = req.body;
      const supplier_id = req.user._id;
      data.supplier_id = supplier_id;
      const newProduct = await createService(data);
      return res.suc201mesres(
        `Product created successfully with id ${newProduct._id}`,
        newProduct
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
  } // w pagination
  async readOne(req, res, next) {
    try {
      const { pid } = req.params;
      const selected = await readOneService(pid);
      if (selected) {
        return res.suc200res(selected);
      } else {
        res.err404product();
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
      return res.suc200mesres("Product updated successfully", updatedProduct);
    } catch (err) {
      return next(err);
    }
  }
  async destroy(req, res, next) {
    try {
      const { pid } = req.params;
      const deletedProduct = await destroyService(pid);
      if (!deletedProduct) {
        return res.err404product();
      }
      return res.suc200mesres("Product deleted successfully", deletedProduct);
    } catch (err) {
      return next(err);
    }
  }
}

class ProductsController2 {
  async create(req, res, next) {
    try {
      const data = req.body;
      const supplier_id = req.user._id;
      data.supplier_id = supplier_id;
      const newProduct = await createService(data);
      // popullating field supplier_id for the response
      const supplier = await usersRepository.readOneRepository(supplier_id)
      let newProductPopullated = { ...newProduct }
      newProductPopullated.supplier_id = supplier;
      return res.suc201mesres(
        `Product created successfully with id ${newProduct._id}`,
        newProductPopullated
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
      // popullating supplier_id field
      const response = all.docs;
      const responsePopullated = await Promise.all(
        response.map(async (each) => {
          const supplier = await usersRepository.readOneRepository(each.supplier_id)
          return { ...each, supplier_id: supplier }
        })
      )
      return res.suc200respag(responsePopullated, paginateInfo);
    } catch (err) {
      return next(err);
    }
  } // w pagination
  async readOne(req, res, next) {
    try {
      const { pid } = req.params;
      const selected = await readOneService(pid);
      if (!selected) {
        return res.err404product();
      } 
      // poppulate field supplier_id
      const supplier = await usersRepository.readOneRepository(selected.supplier_id)
      selected.supplier_id = supplier
      return res.suc200res(selected);
    } catch (err) {
      return next(err);
    }
  }
  async update(req, res, next) {
    try {
      const { pid } = req.params;
      const data = req.body;
      const updatedProduct = await updateService(pid, data);
      // popullating field supplier_id
      const supplier = await usersRepository.readOneRepository(updatedProduct.supplier_id)
      updatedProduct.supplier_id = supplier
      return res.suc200mesres("Product updated successfully", updatedProduct);
    } catch (err) {
      return next(err);
    }
  }
  async destroy(req, res, next) {
    try {
      const { pid } = req.params;
      const deletedProduct = await destroyService(pid);
      if (!deletedProduct) {
        return res.err404product();
      }
      const supplier = await usersRepository.readOneRepository(deletedProduct.supplier_id)
      deletedProduct.supplier_id = supplier
      return res.suc200mesres("Product deleted successfully", deletedProduct);
    } catch (err) {
      return next(err);
    }
  }
}

const persistence = argsUtil.persistence;
let productsController;

switch (persistence) {
  case "memory":
    productsController = new ProductsController2();
    break;
  case "fs":
    productsController = new ProductsController2();
    break;
  default:
    productsController = new ProductsController1();
    break;
}

const { create, read, readOne, update, destroy } = productsController; 
export { create, read, readOne, update, destroy };
