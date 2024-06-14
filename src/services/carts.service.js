import CustomService from "./CustomService.js";
import cartManager from "../data/mongo/managers/CartManager.mongo.js";
//import cartManager from "../data/fs/files/CartManager.fs.js"

// mongo utiliza cartManager.read({ user_id })
// fs utiliza cartManager.read(user_id)

const cartsService = new CustomService(cartManager);

const {
  paginateService,
  readOneService,
  createService,
  updateService,
  destroyService,
  destroyAllService,
} = cartsService;
export {
  paginateService,
  readOneService,
  createService,
  updateService,
  destroyService,
  destroyAllService,
};
