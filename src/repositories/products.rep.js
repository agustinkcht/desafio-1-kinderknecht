import ProductsDTO from "../dto/products.dto.js";
import dao from "../dao/dao.factory.js";

const { productManager } = dao;

class ProductsRepository {
  constructor(manager) {
    this.manager = manager;
  }
  createRepository = async (data) => {
    try {
      data = new ProductsDTO(data);
      const one = await this.manager.create(data);
      return one;
    } catch (err) {
      throw err;
    }
  };
  readRepository = async (filter) => {
    try {
      const all = await this.manager.read(filter);
      return all;
    } catch (err) {
      throw err;
    }
  };
  paginateRepository = async ({ filter, opts }) => {
    try {
      const all = await this.manager.paginate({ filter, opts });
      return all;
    } catch (err) {
      throw err;
    }
  };
  readOneRepository = async (id) => {
    try {
      const one = await this.manager.readOne(id);
      return one;
    } catch (err) {
      throw err;
    }
  };
  updateRepository = async (id, data) => {
    try {
      const one = await this.manager.update(id, data);
      return one;
    } catch (err) {
      throw err;
    }
  };
  destroyRepository = async (id) => {
    try {
      const one = await this.manager.destroy(id);
      return one;
    } catch (err) {
      throw err;
    }
  };
  destroyAllRepository = async (id) => {
    try {
      const all = await this.manager.destroyMany(id);
      return all;
    } catch (err) {
      throw err;
    }
  };
}

const productsRepository = new ProductsRepository(productManager);

export default productsRepository;
