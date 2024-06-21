import CustomService from "./CustomService.js";
import dao from "../DAO/dao.factory.js";

const { cartManager } = dao;

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