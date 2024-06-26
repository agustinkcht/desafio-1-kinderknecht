import CustomService from "./CustomService.js";
import cartsRepository from "../repositories/carts.rep.js";

const cartsService = new CustomService(cartsRepository);

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