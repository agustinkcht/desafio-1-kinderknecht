import dao from "../dao/dao.factory.js";
import UsersDTO from "../dto/users.dto.js";

const { userManager } = dao

class UsersRepository {
    constructor(manager) {
      this.model = manager;
    }
    createRepository = async (data) => {
      try {
        data = new UsersDTO(data)
        const one = await this.model.create(data);
        return one;
      } catch (err) {
        throw err;
      }
    }
    readRepository = async (filter) => {
      try {
        const all = await this.model.read(filter);
        return all;
      } catch (err) {
        throw err;
      }
    }
    paginateRepository = async ({ filter, opts }) => {
      try {
        const all = await this.model.paginate({ filter, opts });
        return all;
      } catch (err) {
        throw err;
      }
    }
    readOneRepository = async (id) => {
      try {
        const one = await this.model.readOne(id);
        return one;
      } catch (err) {
        throw err;
      }
    }
    updateRepository = async (id, data) => {
      try {
        const one = await this.model.update(id, data);
        return one;
      } catch (err) {
        throw err;
      }
    }
    destroyRepository = async(id) => {
      try {
        const one = await this.model.destroy(id);
        return one;
      } catch (err) {
        throw err;
      }
    }
    destroyAllRepository = async (id) => {
      try {
        const all = await this.model.destroyMany(id);
        return all;
      } catch (err) {
        throw err;
      }
    }
  }

  const usersRepository = new UsersRepository(userManager)
  
  export default usersRepository;