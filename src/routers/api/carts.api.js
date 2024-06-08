import CustomRouter from "../CustomRouter.js";
//import cartManager from "../../data/fs/files/CartManager.fs.js";
import cartManager from "../../data/mongo/managers/CartManager.mongo.js";

// importante!
// mongo utiliza cartManager.read({ user_id })
// fs utiliza cartManager.read(user_id)

class CartsRouter extends CustomRouter {
  init() {
    this.read("/", ["USER", "ADMIN"], read);
    this.create("/", ["USER", "ADMIN"], create);
    this.destroy("/all", ["USER", "ADMIN"], destroyAll);
    this.read("/:iid", ["USER", "ADMIN"], readOne); // item id
    this.update("/:iid", ["USER", "ADMIN"], update);
    this.destroy("/:iid", ["USER", "ADMIN"], destroy);
  }
}

const cartsRouter = new CartsRouter();

//functions
async function read(req, res, next) {
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
    const all = await cartManager.paginate({ filter, opts });
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
async function readOne(req, res, next) {
  try {
    const { iid } = req.params;
    const selected = await cartManager.readOne(iid);
    if (selected) {
      return res.suc200res(selected);
    } else {
      res.err404mes("Item not found in the cart");
    }
  } catch (err) {
    return next(err);
  }
}
async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await cartManager.create(data);
    return res.suc201mesres("Added to the cart", one);
  } catch (err) {
    return next(err);
  }
}
async function update(req, res, next) {
  try {
    const { iid } = req.params;
    const data = req.body;
    const updatedItem = await cartManager.update(iid, data);
    return res.suc200mesres("Item updated successfully", updatedItem);
  } catch (err) {
    return next(err);
  }
} // podes modificar quantity y state
async function destroy(req, res, next) {
  try {
    const { iid } = req.params;
    const deletedItem = await cartManager.destroy(iid);
    if (!deletedItem) {
      return res.err404mes("Item not found")
    }
    return res.suc200mesres("Removed from the cart", deletedItem);
  } catch (err) {
    return next(err);
  }
}
async function destroyAll(req, res, next) {
  try {
    const uid = req.user._id;
    const deletedItems = await cartManager.destroyMany(uid);
    return res.suc200mesres("The cart has been cleaned", deletedItems);
  } catch (err) {
    return next(err);
  }
}

export default cartsRouter.getRouter();
