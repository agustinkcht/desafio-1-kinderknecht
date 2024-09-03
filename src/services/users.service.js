import CustomService from "./CustomService.js";
import usersRepository from "../repositories/users.rep.js"

const usersService = new CustomService(usersRepository);

const {
  createService,
  readByEmailService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
} = usersService;
export {
  createService,
  readByEmailService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
};