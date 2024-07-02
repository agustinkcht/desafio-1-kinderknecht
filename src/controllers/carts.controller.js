import {
  paginateService,
  readOneService,
  createService,
  updateService,
  destroyService,
  destroyAllService,
} from "../services/carts.service.js";
import { readOneService as readOneUser } from "../services/users.service.js";
import { readOneService as readOneProduct } from "../services/products.service.js";
import argsUtil from "../utils/args.util.js";
import { populateUser, populateProduct } from "../utils/populate.util.js";
import { getUser } from "../utils/getResource.util.js";

class CartsController1 {
  async read(req, res, next) {
    // con paginate
    try {
      const filter = {};
      const opts = {};
      if (req.query.limit) {
        opts.limit = req.query.limit;
      }
      if (req.query.page) {
        opts.page = req.query.page;
      }
      if (req.query.user_id) {
        filter.user_id = req.query.user_id;
      }
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
  }
  async readOne(req, res, next) {
    try {
      const { iid } = req.params;
      const selected = await readOneService(iid);
      if (selected) {
        return res.suc200res(selected);
      } else {
        res.err404mes("Item not found in the cart");
      }
    } catch (err) {
      return next(err);
    }
  }
  async create(req, res, next) {
    try {
      const data = req.body;
      const one = await createService(data);
      return res.suc201mesres("Added to the cart", one);
    } catch (err) {
      return next(err);
    }
  }
  async update(req, res, next) {
    try {
      const { iid } = req.params;
      const data = req.body;
      const updatedItem = await updateService(iid, data);
      return res.suc200mesres("Item updated successfully", updatedItem);
    } catch (err) {
      return next(err);
    }
  } // podes modificar quantity y state
  async destroy(req, res, next) {
    try {
      const { iid } = req.params;
      const deletedItem = await destroyService(iid);
      if (!deletedItem) {
        return res.err404mes("Item not found");
      }
      return res.suc200mesres("Removed from the cart", deletedItem);
    } catch (err) {
      return next(err);
    }
  }
  async destroyAll(req, res, next) {
    try {
      const { uid } = req.params;
      console.log(uid);
      const deletedItems = await destroyAllService(uid);
      return res.suc200mesres("The cart has been cleaned", deletedItems);
    } catch (err) {
      return next(err);
    }
  }
}

class CartsController2 {
  async read(req, res, next) {
    // con paginate
    try {
      const filter = {};
      const opts = {};
      const user_id = req.query.user_id;
      if (req.query.limit) {
        opts.limit = req.query.limit;
      }
      if (req.query.page) {
        opts.page = req.query.page;
      }
      if (user_id) {
        filter.user_id = user_id;
      }
      const all = await paginateService({ filter, opts });
      const paginateInfo = {
        page: all.page,
        totalPages: all.totalPages,
        limit: all.limit,
        prevPage: all.prevPage,
        nextPage: all.nextPage,
        totalDocs: all.totalDocs,
      };
      const items = all.docs;
      
      const user = await getUser(user_id)
      console.log(user)
      const products = await populateProduct(items)
      console.log(products)
      const populatedItems = items.map((item, index) => ({
        ...item,
        user_id: user,
        product_id: products[index]
      }))
      console.log(populatedItems)
      //son varios user_id. tengo que armar un loop para recorrerlo, encontrar ese user_id, fetchear y reemplazar.
      return res.suc200respag(populatedItems, paginateInfo);
    } catch (err) {
      return next(err);
    }
  }
  async readOne(req, res, next) {
    try {
      const { iid } = req.params;
      let selected = await readOneService(iid);
      if (!selected) {
        return res.err404mes("Item not found in the cart");
      }
      //console.log(selected)
      const { user_id, product_id } = selected;
      const user = await readOneUser(user_id);
      const product = await readOneProduct(product_id);
      if (!user || !product) {
        return res.err404mes("Unable to populate cart's fields");
      } else {
        selected.user_id = user;
        selected.product_id = product;
      }
      return res.suc200res(selected);
    } catch (err) {
      return next(err);
    }
  }
  async create(req, res, next) {
    try {
      const data = req.body;
      const one = await createService(data);
      if (!one) {
        return res.err400mes("Error adding to the cart");
      }
      const { user_id, product_id } = one;
      const user = await readOneUser(user_id);
      const product = await readOneProduct(product_id);
      if (!user || !product) {
        return res.err404mes("Unable to populate cart's fields");
      } else {
        one.user_id = user;
        one.product_id = product;
      }
      console.log(one)
      return res.suc201mesres("Added to the cart", one);
      
    } catch (err) {
      return next(err);
    }
  }
  async update(req, res, next) {
    try {
      const { iid } = req.params;
      const data = req.body;
      const updatedItem = await updateService(iid, data);
      if (!updatedItem) {
        return res.err400mes("Error updating cart item");
      }
      const { user_id, product_id } = updatedItem;
      const user = await readOneUser(user_id);
      const product = await readOneProduct(product_id);
      if (!user || !product) {
        return res.err404mes("Unable to populate cart's fields");
      } else {
        updatedItem.user_id = user;
        updatedItem.product_id = product;
      }
      return res.suc200mesres("Item updated successfully", updatedItem);
    } catch (err) {
      return next(err);
    }
  } // podes modificar quantity y state
  async destroy(req, res, next) {
    try {
      const { iid } = req.params;
      const deletedItem = await destroyService(iid);
      if (!deletedItem) {
        return res.err404mes("Item not found");
      }
      const { user_id, product_id } = deletedItem;
      const user = await readOneUser(user_id);
      const product = await readOneProduct(product_id);
      if (!user || !product) {
        return res.err404mes("Unable to populate cart's fields");
      } else {
        deletedItem.user_id = user;
        deletedItem.product_id = product;
      }
      return res.suc200mesres("Removed from the cart", deletedItem);
    } catch (err) {
      return next(err);
    }
  }
  async destroyAll(req, res, next) {
    try {
      const { uid } = req.params;
      const deletedItems = await destroyAllService(uid);
      if (deletedItems.length < 1) {
        return res.err400mes("There are no items in the cart")
      }
      const user = await readOneUser(uid)
      const { email } = user
      return res.suc200mesres(`The cart of ${email} has been cleared`);
    } catch (err) {
      return next(err);
    }
  }
}

const persistence = argsUtil.persistence;
let cartsController;

switch (persistence) {
  case "memory":
    cartsController = new CartsController2();
    break;
  case "fs":
    cartsController = new CartsController2();
    break;
  default:
    cartsController = new CartsController1();
    break;
}

const { read, readOne, create, update, destroy, destroyAll } = cartsController;
export { read, readOne, create, update, destroy, destroyAll };
