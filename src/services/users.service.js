import CustomService from "./CustomService.js";
import dao from "../DAO/dao.factory.js";

const { userManager } = dao;

const usersService = new CustomService(userManager);

const {
  createService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
} = usersService;
export {
  createService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
};