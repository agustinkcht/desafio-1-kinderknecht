import CustomService from "./CustomService.js";
import productManager from "../data/mongo/managers/ProductManager.mongo.js";
//import productManager from '../data/fs/files/ProductManager.fs.js'

const productsService = new CustomService(productManager);
const {
  createService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
} = productsService;
export {
  createService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
};
