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
import { populateProduct } from "../utils/populate.util.js";
import { getUser } from "../utils/getResource.util.js";

class CartsController1 {
  async read(req, res, next) {
    // con paginate
    try {
      const filter = {};
      const opts = {};
      const user_id = req.user._id;
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
      if (!selected) {
        return res.err404item();
      }
      return res.suc200res(selected);
    } catch (err) {
      return next(err);
    }
  }
  async create(req, res, next) {
    try {
      const data = req.body;
      const user_id = req.user._id;
      data.user_id = user_id;
      const one = await createService(data);
      if (!one) {
        return res.err400addCartItem();
      }
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
        return res.err400updateCartItem();
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
        return res.err404item();
      }
      return res.suc200mesres("Removed from the cart", deletedItem);
    } catch (err) {
      return next(err);
    }
  }
  async destroyAll(req, res, next) {
    try {
      const user_id = req.user._id;
      const deletedItems = await destroyAllService(user_id);
      if (deletedItems.length < 1) {
        return res.err404itemsCart();
      }
      const user = await readOneUser(user_id);
      const { email } = user;
      return res.suc200mes(`The cart of ${email} has been cleared`);
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
      const user_id = req.user._id; //already present in req (after jwt verification)
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
      //set paginate info data
      const paginateInfo = {
        page: all.page,
        totalPages: all.totalPages,
        limit: all.limit,
        prevPage: all.prevPage,
        nextPage: all.nextPage,
        totalDocs: all.totalDocs,
      };
      // populating items
      const items = all.docs;
      const user = await getUser(user_id);
      const products = await populateProduct(items);
      const populatedItems = items.map((item, index) => ({
        ...item,
        user_id: user,
        product_id: products[index],
      }));
      return res.suc200respag(populatedItems, paginateInfo);
    } catch (err) {
      return next(err);
    }
  }
  async readOne(req, res, next) {
    try {
      const { iid } = req.params;
      const selected = await readOneService(iid);
      if (!selected) {
        return res.err404item();
      }
      const user_id = req.user._id;
      const { product_id } = selected;
      const user = await readOneUser(user_id);
      const product = await readOneProduct(product_id);
      if (!user || !product) {
        return res.err404info();
      }
      let selectedPopulated = { ...selected };
      selectedPopulated.user_id = user;
      selectedPopulated.product_id = product;
      return res.suc200res(selectedPopulated);
    } catch (err) {
      return next(err);
    }
  }
  async create(req, res, next) {
    try {
      const data = req.body;
      const user_id = req.user._id;
      data.user_id = user_id;
      const one = await createService(data);
      if (!one) {
        return res.err400addCartItem();
      }
      const { product_id } = one;
      const user = await readOneUser(user_id);
      const product = await readOneProduct(product_id);
      if (!user || !product) {
        return res.err404info();
      }
      let onePopulated = { ...one };
      onePopulated.user_id = user;
      onePopulated.product_id = product;
      return res.suc201mesres("Added to the cart", onePopulated);
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
        return res.err400updateCartItem();
      }
      const user_id = req.user._id;
      const { product_id } = updatedItem;
      const user = await readOneUser(user_id);
      const product = await readOneProduct(product_id);
      if (!user || !product) {
        return res.err404info();
      }
      let updatedItemPopulated = { ...updatedItem };
      updatedItemPopulated.user_id = user;
      updatedItemPopulated.product_id = product;
      return res.suc200mesres(
        "Item updated successfully",
        updatedItemPopulated
      );
    } catch (err) {
      return next(err);
    }
  } // podes modificar quantity y state
  async destroy(req, res, next) {
    try {
      const { iid } = req.params;
      const deletedItem = await destroyService(iid);
      if (!deletedItem) {
        return res.err404item();
      }
      const user_id = req.user._id;
      const { product_id } = deletedItem;
      const user = await readOneUser(user_id);
      const product = await readOneProduct(product_id);
      if (!user || !product) {
        return res.err404info();
      }
      let deletedItemPopulated = { ...deletedItem };
      deletedItemPopulated.user_id = user;
      deletedItemPopulated.product_id = product;
      return res.suc200mesres("Removed from the cart", deletedItemPopulated);
    } catch (err) {
      return next(err);
    }
  }
  async destroyAll(req, res, next) {
    try {
      const user_id = req.user._id;
      const deletedItems = await destroyAllService(user_id);
      if (deletedItems.length < 1) {
        return res.err404itemsCart();
      }
      const user = await readOneUser(user_id);
      const { email } = user;
      return res.suc200mes(`The cart of ${email} has been cleared`);
    } catch (err) {
      return next(err);
    }
  }
}

const persistence = argsUtil.persistence;
let cartsController;

switch (persistence) { // choosing controller depending on persistency
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
