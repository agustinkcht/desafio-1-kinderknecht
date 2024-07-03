import fs from "fs";

class ProductManager {
  constructor() {
    this.path = "./src/dao/fs/files/products.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const initData = JSON.stringify([], null, 4);
      fs.writeFileSync(this.path, initData);
      console.log("File created");
    } else {
      console.log("File located");
    }
  }
  async create(data) {
    try {
      let allProducts = await fs.promises.readFile(this.path, "utf-8");
      allProducts = JSON.parse(allProducts);
      allProducts.push(data);
      allProducts = JSON.stringify(allProducts, null, 4);
      await fs.promises.writeFile(this.path, allProducts);
      return data;
    } catch (err) {
      throw err;
    }
  }
  async read(category = null) {
    try {
      let allProducts = await fs.promises.readFile(this.path, "utf-8");
      allProducts = JSON.parse(allProducts);
      if (category) {
        allProducts = allProducts.filter((each) => each.category === category);
      }
      if (allProducts.length === 0) {
        return null;
      }
      return allProducts;
    } catch (err) {
      throw err;
    }
  }
  async paginate({ filter = {}, opts = {} }) {
    try {
      let allProducts = await fs.promises.readFile(this.path, "utf-8");
      allProducts = JSON.parse(allProducts);
      if (filter.category) {
        allProducts = allProducts.filter(
          (product) => product.category === filter.category
        );
      };
      if (filter.title) {
        allProducts = allProducts.filter(
          (product) => filter.title.test(product.title)
        );
      } 
      const totalDocs = allProducts.length;
      const limit = opts.limit || 10;
      const page = opts.page || 1;
      const totalPages = Math.ceil(totalDocs / limit);
      const offset = (page - 1) * limit;
      const paginatedProducts = allProducts.slice(offset, offset + limit);
      const paginateInfo = {
        page,
        totalPages,
        limit,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null,
        totalDocs
      };
      return { docs: paginatedProducts, ...paginateInfo };
    } catch (err) {
      throw err;
    }
  }
  async readOne(id) {
    try {
      let allProducts = await fs.promises.readFile(this.path, "utf-8");
      allProducts = JSON.parse(allProducts);
      let selected = allProducts.find((each) => each._id === id);
      if (selected) {
        return selected;
      } else {
        const error = new Error(
          "No product found with the specified ID. Please check the ID and try again."
        );
        error.statusCode = 404;
        throw error;
      }
    } catch (err) {
      throw err;
    }
  }
  async destroy(id) {
    try {
      let allProducts = await fs.promises.readFile(this.path, "utf-8");
      allProducts = JSON.parse(allProducts);
      let selected = allProducts.find((each) => each._id === id);
      if (selected) {
        let withoutSelected = allProducts.filter((each) => each._id !== id);
        withoutSelected = JSON.stringify(withoutSelected, null, 4);
        await fs.promises.writeFile(this.path, withoutSelected);
        return selected;
      } else {
        const error = new Error(
          "No product found with the specified ID. Please check the ID and try again."
        );
        error.statusCode = 404;
        throw error;
      }
    } catch (err) {
      throw err;
    }
  }
  async update(id, data) {
    try {
      let allProducts = await this.read();
      let selected = allProducts.find((each) => each._id === id);
      if (selected) {
        for (let prop in data) {
          selected[prop] = data[prop];
        }
        allProducts = JSON.stringify(allProducts, null, 4);
        await fs.promises.writeFile(this.path, allProducts);
        return selected;
      } else {
        const error = new Error(
          "No product found with the specified ID. Please check the ID and try again."
        );
        error.statusCode = 404;
        throw error;
      }
    } catch (err) {
      throw err;
    }
  }
}

const productManager = new ProductManager();
export default productManager;
