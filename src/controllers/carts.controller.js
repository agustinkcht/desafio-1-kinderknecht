import {
  paginateService,
  readOneService,
  createService,
  updateService,
  destroyService,
  destroyAllService,
} from "../services/carts.service.js";

//functions
class CartsController {
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
      const uid = req.user._id;
      console.log(uid)
      const deletedItems = await destroyAllService(uid);
      return res.suc200mesres("The cart has been cleaned", deletedItems);
    } catch (err) {
      return next(err);
    }
  }
}

const cartsController = new CartsController();

const { read, readOne, create, update, destroy, destroyAll } = cartsController;
export { read, readOne, create, update, destroy, destroyAll };
