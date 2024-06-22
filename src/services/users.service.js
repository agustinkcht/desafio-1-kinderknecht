import CustomService from "./CustomService.js";
import usersRepository from "../repositories/users.rep.js"

const usersService = new CustomService(usersRepository);

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