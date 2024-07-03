import fs from "fs";
import crypto from "crypto";

class CartManager {
  constructor() {
    this.path = "./src/dao/fs/files/carts.json";
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
      let allCarts = await fs.promises.readFile(this.path, "utf-8");
      allCarts = JSON.parse(allCarts);
      allCarts.push(data);
      allCarts = JSON.stringify(allCarts, null, 4);
      await fs.promises.writeFile(this.path, allCarts);
      return data;
    } catch (err) {
      throw err;
    }
  }
  async read(user_id) {
    if (!user_id) {
      const error = new Error("Enter user ID");
      throw error;
    }
    try {
      let allCarts = await fs.promises.readFile(this.path, "utf-8");
      allCarts = JSON.parse(allCarts);
      let cart = allCarts.filter((each) => each.user_id === user_id);
      if (cart) {
        return cart;
      } else {
        const error = new Error(
          `There are no products in the cart of user: ${user_id}`
        );
        throw error;
      }
    } catch (err) {
      throw err;
    }
  }
  async paginate({ filter = {}, opts = {} }) {
    let allCarts = await fs.promises.readFile(this.path, "utf-8");
    allCarts = JSON.parse(allCarts);
    try {
      //filter
      if (filter.user_id) {
        allCarts = allCarts.filter((cart) => cart.user_id === filter.user_id);
      }
      //options
      const totalDocs = allCarts.length;
      const limit = opts.limit || 10;
      const page = opts.page || 1;
      const totalPages = Math.ceil(totalDocs / limit);
      const offset = (page - 1) * limit;
      const paginatedCarts = allCarts.slice(offset, offset + limit);
      const paginateInfo = {
        page,
        totalPages,
        limit,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null,
        totalDocs,
      };
      return { docs: paginatedCarts, ...paginateInfo };
    } catch (err) {
      throw err;
    }
  }
  async readOne(id) {
    try {
      let allCarts = await fs.promises.readFile(this.path, "utf-8");
      allCarts = JSON.parse(allCarts);
      let selected = allCarts.find((each) => each._id === id);
      if (selected) {
        return selected;
      } else {
        const error = new Error(`No item found in the cart with id ${id}`);
        error.statusCode = 404;
        throw error;
      }
    } catch (err) {
      throw err;
    }
  }
  async destroy(id) {
    try {
      let allCarts = await fs.promises.readFile(this.path, "utf-8");
      allCarts = JSON.parse(allCarts);
      let selected = allCarts.find((each) => each._id === id);
      if (selected) {
        let withoutSelected = allCarts.filter((each) => each._id !== id);
        withoutSelected = JSON.stringify(withoutSelected, null, 4);
        await fs.promises.writeFile(this.path, withoutSelected);
        return selected;
      } else {
        const error = new Error(`No item found in the cart with id ${id}`);
        error.statusCode = 404;
        throw error;
      }
    } catch (err) {
      throw err;
    }
  }
  async destroyMany(user_id) {
    try {
        let allCarts = await fs.promises.readFile(this.path, "utf-8");
        allCarts = JSON.parse(allCarts);
        let many = allCarts.filter((cart) => cart.user_id === user_id);
        if (!many) {
            const error = new Error ("No items found associated with the user.")
            error.statusCode = 404;
            throw error;
        }
        let withoutMany = allCarts.filter((cart) => cart.user_id !== user_id);
        withoutMany = JSON.stringify(withoutMany, null, 4);
        await fs.promises.writeFile(this.path, withoutMany);
        return many;
    } catch (err) {
        throw err;
    }
  }
  async update(id, data) {
    try {
      let allCarts = await fs.promises.readFile(this.path, "utf-8");
      allCarts = JSON.parse(allCarts);
      let selected = allCarts.find((each) => each._id === id);
      if (selected) {
        for (let prop in data) {
          selected[prop] = data[prop];
        }
        allCarts = JSON.stringify(allCarts, null, 4);
        await fs.promises.writeFile(this.path, allCarts);
        return selected;
      } else {
        const error = new Error(`No item found in the cart with id ${id}`);
        error.statusCode = 404;
        throw error;
      }
    } catch (err) {
      throw err;
    }
  }
}

const cartManager = new CartManager();
export default cartManager;
