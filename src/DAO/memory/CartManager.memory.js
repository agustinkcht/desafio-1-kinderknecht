class CartManager {
  static #carts = [];
  create(data) {
    try {
      CartManager.#carts.push(data);
      return data;
    } catch (err) {
      throw err;
    }
  }
  read() {
    try {
      let allCarts = CartManager.#carts;
      return allCarts;
    } catch (err) {
      throw err;
    }
  }
  paginate({ filter = {}, opts = {} }) {
    try {
      let allCarts = CartManager.#carts;
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
  readOne(id) {
    try {
      let allCarts = CartManager.#carts;
      let selected = allCarts.find((each) => each._id === id);
      if (!selected) {
        throw new Error("No item found in the cart");
      } else {
        return selected;
      }
    } catch (err) {
      throw err;
    }
  }
  update(id, data) {
    try {
      let allCarts = CartManager.#carts;
      let selected = allCarts.find((each) => each._id === id);
      if (selected) {
        for (let prop in data) {
          selected[prop] = data[prop];
        }
        CartManager.#carts.push(selected);
        return selected;
      } else {
        const error = new Error(
          "No item found with the specified ID. Please check the ID and try again."
        );
        error.statusCode = 404;
        throw error;
      }
    } catch (err) {
      throw err;
    }
  }
  destroy(id) {
    try {
      let allCarts = CartManager.#carts;
      let selected = allCarts.find((each) => each._id === id);
      if (!selected) {
        throw new Error("No item found with the specified id.");
      }
      let withoutSelected = allCarts.filter((each) => each._id !== id);
      CartManager.#carts = withoutSelected;
      return selected;
    } catch (err) {
      throw err;
    }
  }
  destroyMany(user_id) {
    try {
      let allCarts = CartManager.#carts;
      let many = allCarts.filter((each) => each.user_id === user_id);
      if (!many) {
        throw new Error("No items found with the specified id");
      }
      let withoutMany = allCarts.filter((each) => each.user_id !== user_id);
      CartManager.#carts = withoutMany;
      return many;
    } catch (err) {
      throw err;
    }
  }
}

const cartManager = new CartManager();

// cartManager.create({
//   _id: "a42cfcae08ec940be3992a04",
//   createdAt: "2024-06-28T21:02:03.796Z",
//   updatedAt: "2024-06-28T21:02:03.796Z",
//   user_id: "66818054e857f2ed5dbf802c",
//   product_id: "663cea2c57109ba2e5d3b56f",
//   quantity: 1,
//   state: "delivered",
// });

// cartManager.create({
//   _id: "0dfab56396d8e4eef5f15eb4",
//   createdAt: "2024-06-28T21:02:03.796Z",
//   updatedAt: "2024-06-28T21:02:03.796Z",
//   user_id: "66818054e857f2ed5dbf802c",
//   product_id: "663cea2c57109ba2e5d3b573",
//   quantity: 5,
//   state: "delivered",
// });

// cartManager.create({
//   _id: "a7ea65f79e26873268ffbe49",
//   createdAt: "2024-06-28T21:02:03.796Z",
//   updatedAt: "2024-06-28T21:02:03.796Z",
//   user_id: "6681805ee857f2ed5dbf802e",
//   product_id: "663ceb1057109ba2e5d3b58e",
//   quantity: 1,
//   state: "reserved",
// });

// cartManager.create({
//   _id: "8fd95873a35d3a32357743b5",
//   createdAt: "2024-06-28T21:02:03.796Z",
//   updatedAt: "2024-06-28T21:02:03.796Z",
//   user_id: "6681805ee857f2ed5dbf802e",
//   product_id: "663ceb1057109ba2e5d3b595",
//   quantity: 3,
//   state: "reserved",
// });

export default cartManager;

// TESTING
// node src/data/memory/CartManager.js

//cartManager.read()
//cartManager.readOne('tt7474')
//cartManager.update(2, {state: 'paid'})
//cartManager.destroy(2)
