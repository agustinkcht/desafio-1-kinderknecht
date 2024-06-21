import CustomService from "./CustomService.js";
import dao from "../DAO/dao.factory.js";

const { productManager } = dao;

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