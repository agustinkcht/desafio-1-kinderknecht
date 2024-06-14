import CustomService from "./CustomService.js";
import userManager from "../data/mongo/managers/UserManager.mongo.js";
//import userManager from '../data/fs/files/UserManager.fs.js'

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
