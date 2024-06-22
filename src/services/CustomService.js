class CustomService {
  constructor(repository) {
    this.repository = repository;
  }
  createService = async (data) => {
    try {
      const one = await this.repository.createRepository(data);
      return one;
    } catch (err) {
      throw err;
    }
  }
  readService = async (filter) => {
    try {
      const all = await this.repository.readRepository(filter);
      return all;
    } catch (err) {
      throw err;
    }
  }
  paginateService = async ({ filter, opts }) => {
    try {
      const all = await this.repository.paginateRepository({ filter, opts });
      return all;
    } catch (err) {
      throw err;
    }
  }
  readOneService = async (id) => {
    try {
      const one = await this.repository.readOneRepository(id);
      return one;
    } catch (err) {
      throw err;
    }
  }
  updateService = async (id, data) => {
    try {
      const one = await this.repository.updateRepository(id, data);
      return one;
    } catch (err) {
      throw err;
    }
  }
  destroyService = async(id) => {
    try {
      const one = await this.repository.destroyRepository(id);
      return one;
    } catch (err) {
      throw err;
    }
  }
  destroyAllService = async (id) => {
    try {
      const all = await this.repository.destroyAllRepository(id);
      return all;
    } catch (err) {
      throw err;
    }
  }
}

export default CustomService;
