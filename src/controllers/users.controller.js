import userManager from "../data/mongo/managers/UserManager.mongo.js";
//import userManager from '../data/fs/files/UserManager.fs.js'

//functions
async function create(req, res, next) {
    try {
      const data = req.body;
      const newUser = await userManager.create(data);
      return res
        .suc201mesres(`User created successfully with id ${newUser.id}`, newUser);
    } catch (err) {
      return next(err);
    }
}
async function read(req, res, next) {
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
    const all = await userManager.paginate({ filter, opts });
    const paginateInfo = {
      page: all.page,
      totalPages: all.totalPages,
      limit: all.limit,
      prevPage: all.prevPage,
      nextPage: all.nextPage,
      totalDocs: all.totalDocs
    };
    const response = all.docs;
    return res.suc200respag(response, paginateInfo);
  } catch (err) {
    return next(err);
  }
} // con paginate
async function readOne(req, res, next) {
  try {
    const { uid } = req.params;
    const selected = await userManager.readOne(uid);
    if (selected) {
      return res.suc200res(selected);
    } else {
      return res.err404()
    }
  } catch (err) {
    return next(err);
  }
}
async function update(req, res, next) {
  try {
    const { uid } = req.params;
    const data = req.body;
    const updatedUser = await userManager.update(uid, data);
    return res.suc200mesres(`User with id ${uid} updated successfully`, updatedUser);
  } catch (err) {
    return next(err);
  }
}
async function destroy(req, res, next) {
  try {
    const { uid } = req.params;
    const deletedUser = await userManager.destroy(uid);
    if (!user) {
      return res.err404mes("User not found")
    }
    return res.suc200mesres("User deleted successfully", deletedUser);
  } catch (err) {
    return next(err);
  }
}

export { create, read, readOne, update, destroy };