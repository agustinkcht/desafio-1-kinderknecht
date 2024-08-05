import {
  createService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
  readByEmailService,
} from "../services/users.service.js";

//functions
class UsersController {
  async create(req, res, next) {
    try {
      const data = req.body;
      const newUser = await createService(data);
      return res.suc201mesres(
        "User created successfully with id " + newUser._id,
        newUser
      );
    } catch (err) {
      return next(err);
    }
  }
  async readByEmail(req, res, next) {
    try {
      const { email } = req.params;
      const selected = await readByEmailService(email);
      if (selected) {
        return res.suc200res(selected);
      } else {
        return res.err404user();
      }
    } catch (err) {
      return next(err);
    }
  }
  async read(req, res, next) {
    try {
      const filter = {};
      const opts = {};
      if (req.query.limit) {
        opts.limit = req.query.limit;
      }
      if (req.query.page) {
        opts.page = req.query.page;
      }
      if (req.query.role) {
        filter.role = req.query.role;
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
  } // con paginate
  async readOne(req, res, next) {
    try {
      const { uid } = req.params;
      const selected = await readOneService(uid);
      if (selected) {
        return res.suc200res(selected);
      } else {
        return res.err404user();
      }
    } catch (err) {
      return next(err);
    }
  }
  async update(req, res, next) {
    try {
      const { uid } = req.params;
      const data = req.body;
      const updatedUser = await updateService(uid, data);
      return res.suc200mesres(
        `User with id ${uid} updated successfully`,
        updatedUser
      );
    } catch (err) {
      return next(err);
    }
  }
  async destroy(req, res, next) {
    try {
      const { uid } = req.params;
      const deletedUser = await destroyService(uid);
      if (!deletedUser) {
        return res.err404user();
      }
      return res.suc200mesres("User deleted successfully", deletedUser);
    } catch (err) {
      return next(err);
    }
  }
}

const usersController = new UsersController();
const { create, read, readByEmail, readOne, update, destroy } = usersController; // defining
export { create, read, readByEmail, readOne, update, destroy };
