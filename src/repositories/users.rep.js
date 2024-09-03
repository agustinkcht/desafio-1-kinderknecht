import UsersDTO from "../dto/users.dto.js";
import dao from "../dao/dao.factory.js";

const { userManager } = dao

class UsersRepository {
    constructor(manager) {
      this.manager = manager;
    }
    createRepository = async (data) => {
      try {
        data = new UsersDTO(data)
        const one = await this.manager.create(data);
        return one;
      } catch (err) {
        throw err;
      }
    }
    readRepository = async (filter) => {
      try {
        const all = await this.manager.read(filter);
        return all;
      } catch (err) {
        throw err;
      }
    }
    readByEmailRepository = async (email) => {
      try {
        const one = await this.manager.readByEmail(email);
        return one;
      } catch (err) {
        throw err;
      }
    }
    paginateRepository = async ({ filter, opts }) => {
      try {
        const all = await this.manager.paginate({ filter, opts });
        return all;
      } catch (err) {
        throw err;
      }
    }
    readOneRepository = async (id) => {
      try {
        const one = await this.manager.readOne(id);
        return one;
      } catch (err) {
        throw err;
      }
    }
    updateRepository = async (id, data) => {
      try {
        const one = await this.manager.update(id, data);
        return one;
      } catch (err) {
        throw err;
      }
    }
    destroyRepository = async(id) => {
      try {
        const one = await this.manager.destroy(id);
        return one;
      } catch (err) {
        throw err;
      }
    }
    destroyAllRepository = async (id) => {
      try {
        const all = await this.manager.destroyMany(id);
        return all;
      } catch (err) {
        throw err;
      }
    }
}

const usersRepository = new UsersRepository(userManager)

export default usersRepository;