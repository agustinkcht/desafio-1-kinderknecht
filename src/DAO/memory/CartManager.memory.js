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
      return selected;
    } catch (err) {
      throw err;
    }
  }
  update(id, data) {
    try {
      let allCarts = CartManager.#carts;
      let selected = allCarts.find((each) => each._id === id);
      for (let prop in data) {
        selected[prop] = data[prop];
      }
      CartManager.#carts.push(selected);
      return selected;
    } catch (err) {
      throw err;
    }
  }
  destroy(id) {
    try {
      let allCarts = CartManager.#carts;
      let selected = allCarts.find((each) => each._id === id);
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
      let withoutMany = allCarts.filter((each) => each.user_id !== user_id);
      CartManager.#carts = withoutMany;
      return many;
    } catch (err) {
      throw err;
    }
  }
}

const cartManager = new CartManager();

export default cartManager;

cartManager.create({
  _id: "a42cfcae08ec940be3992a04",
  user_id: "6691882c4d21c1bc0efdd683",
  product_id: "663cea2c57109ba2e5d3b56f",
  quantity: 1,
  state: "delivered",
  createdAt: "2024-06-28T21:02:03.796Z",
  updatedAt: "2024-06-28T21:02:03.796Z"
});

cartManager.create({
  _id: "0dfab56396d8e4eef5f15eb4",
  user_id: "6691882c4d21c1bc0efdd683",
  product_id: "663cea2c57109ba2e5d3b573",
  quantity: 5,
  state: "delivered",
  createdAt: "2024-06-28T21:02:03.796Z",
  updatedAt: "2024-06-28T21:02:03.796Z"
});


// TESTING
// node src/data/memory/CartManager.js

//cartManager.read()
//cartManager.readOne('tt7474')
//cartManager.update(2, {state: 'paid'})
//cartManager.destroy(2)
