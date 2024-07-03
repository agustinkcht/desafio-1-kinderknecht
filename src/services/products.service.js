import CustomService from "./CustomService.js";
import productsRepository from "../repositories/products.rep.js";

const productsService = new CustomService(productsRepository);

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