class CustomService {
  constructor(manager) {
    this.manager = manager;
  }
  createService = async (data) => {
    try {
      const one = await this.manager.create(data);
      return one;
    } catch (err) {
      throw err;
    }
  }
  readService = async (filter) => {
    try {
      const all = await this.manager.read(filter);
      return all;
    } catch (err) {
      throw err;
    }
  }
  paginateService = async ({ filter, opts }) => {
    try {
      const all = await this.manager.paginate({ filter, opts });
      return all;
    } catch (err) {
      throw err;
    }
  }
  readOneService = async (id) => {
    try {
      const one = await this.manager.readOne(id);
      return one;
    } catch (err) {
      throw err;
    }
  }
  updateService = async (id, data) => {
    try {
      const one = await this.manager.update(id, data);
      return one;
    } catch (err) {
      throw err;
    }
  }
  destroyService = async(id) => {
    try {
      const one = await this.manager.destroy(id);
      return one;
    } catch (err) {
      throw err;
    }
  }
  destroyAllService = async (id) => {
    try {
      const all = await this.manager.destroyMany(id);
      return all;
    } catch (err) {
      throw err;
    }
  }
}

export default CustomService;
