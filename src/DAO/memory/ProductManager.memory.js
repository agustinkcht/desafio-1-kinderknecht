class ProductManager {
  static #products = [];
  create(data) {
    try {
      ProductManager.#products.push(data);
      return data;
    } catch (err) {
      throw err;
    }
  }
  read() {
    try {
      return ProductManager.#products;
    } catch (err) {
      console.log("Unable to reach the products");
      throw err;
    }
  }
  paginate({ filter = {}, opts = {} }) {
    try {
      let allProducts = ProductManager.#products;
      if (filter.category) {
        allProducts = allProducts.filter(
          (product) => product.category === filter.category
        );
      }
      if (filter.title) {
        allProducts = allProducts.filter((product) =>
          filter.title.test(product.title)
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
        totalDocs,
      };
      return { docs: paginatedProducts, ...paginateInfo };
    } catch (err) {
      throw err;
    }
  }
  readOne(id) {
    try {
      let allProducts = ProductManager.#products;
      let selected = allProducts.find((each) => each._id === id);
      if (!selected) {
        throw new Error(
          "No product found with the specified ID. Please check the ID and try again."
        );
      }
      return selected;
    } catch (err) {
      throw err;
    }
  }
  destroy(id) {
    try {
      let allProducts = ProductManager.#products;
      let selected = allProducts.find((product) => product._id === id);
      if (!selected) {
        throw new Error(
          "No product found with the specified ID. Please check the ID and try again."
        );
      }
      let withoutSelected = allProducts.filter((product) => product._id !== id);
      ProductManager.#products = withoutSelected;
      return selected;
    } catch (err) {
      throw err;
    }
  }
  update(id, data) {
    try {
      let allProducts = ProductManager.#products;
      let selected = allProducts.find((each) => each._id === id);
      if (selected) {
        for (let prop in data) {
          selected[prop] = data[prop];
        }
        ProductManager.#products.push(selected);
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

productManager.create({
  _id: "663cea2c57109ba2e5d3b56f",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "Airpods Pro 2",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "accessories",
  price: 249,
  stock: 40,
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b570",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "Apple EarPods",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "accessories",
  price: 89,
  stock: 40,
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b571",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "Airpods Max",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "accessories",
  price: 549,
  stock: 40,
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b572",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "Airpods 3rd gen",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "accessories",
  price: 169,
  stock: 40,
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b573",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "iPhone 15 Pro",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "phones",
  price: 999,
  stock: 30,
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b574",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "iPhone 14",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "phones",
  price: 699,
  stock: 30,
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b575",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "Apple Watch 9",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "watches",
  price: 399,
  stock: 35,
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b576",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "MacBook Air 13 M2",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "laptops",
  price: 999,
  stock: 20,
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b577",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "MacBook Pro 14 M3",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "laptops",
  price: 1399,
  stock: 20,
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b578",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "Mac Studio M2 Max",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "computers",
  price: 1999,
  stock: 20,
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b579",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "iPhone SE Plus",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "phones",
  price: 499,
  stock: 30,
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b57a",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "iPhone XR2",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "phones",
  price: 599,
  stock: 30,
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b57b",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "iPhone 11",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "phones",
  price: 599,
  stock: 30,
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b57c",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "iPhone XS",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "phones",
  price: 899,
  stock: 30,
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b57d",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "iPhone 8",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "phones",
  price: 499,
  stock: 30,
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b57e",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "iPhone 7 Plus",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "phones",
  price: 549,
  stock: 30,
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b57f",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "AirPods Pro Lite",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "accessories",
  price: 199,
  stock: 40,
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b580",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "AirTag Keychain",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "accessories",
  price: 29,
  stock: 40,
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b581",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "AirTag Leather Loop",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "accessories",
  price: 39,
  stock: 40,
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b582",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "Apple Watch Series 8",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "accessories",
  price: 449,
  stock: 35,
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b583",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "Apple Watch Sport Loop Band",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "accessories",
  price: 49,
  stock: 35,
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b584",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "Apple Watch Milanese Loop Band",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "accessories",
  price: 99,
  stock: 35,
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b585",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "MacBook Pro 16 M4",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "laptops",
  price: 2499,
  stock: 20,
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b586",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "MacBook Air 14 M2",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "laptops",
  price: 1199,
  stock: 20,
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b587",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "iMac Pro 32-inch",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "computers",
  price: 3499,
  stock: 20,
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b588",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "Mac Mini Pro",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "computers",
  price: 1499,
  stock: 20,
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b589",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "Anker PowerPort Atom III",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "chargers",
  price: 39,
  stock: 50,
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b58a",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "RAVPower 30W 2-Port Wall Charger",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "chargers",
  price: 19,
  stock: 50,
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b58b",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "Belkin Boost Charge 27W USB-C Wall Charger",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "chargers",
  price: 29,
  stock: 50,
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b58c",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "AmazonBasics Nylon Braided Lightning to USB-A Cable",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "cables",
  price: 12,
  stock: 50,
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b58d",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "UGREEN USB-C to 3.5mm Headphone Jack Adapter",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "cables",
  price: 9,
  stock: 50,
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b58e",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "Anker Soundcore Life Q20 Hybrid Active Noise Cancelling Headphones",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "headphones",
  price: 59,
  stock: 50,
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b58f",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "Sony WH-1000XM4 Wireless Noise Cancelling Headphones",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "headphones",
  price: 279,
  stock: 50,
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b590",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "Bose QuietComfort 45 Wireless Headphones",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "headphones",
  price: 329,
  stock: 50,
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b591",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "JBL Tune 750BTNC Wireless Over-Ear Headphones",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "headphones",
  price: 129,
  stock: 50,
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b592",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "Sennheiser HD 450BT Wireless Noise Cancelling Headphones",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "headphones",
  price: 199,
  stock: 50,
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b593",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "Samsung Fast Charge Wireless Charging Stand",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "chargers",
  price: 49,
  stock: 50,
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b594",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "Mophie Dual Wireless Charging Pad",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "chargers",
  price: 69,
  stock: 50,
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b595",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "Roku Wireless Charging Pad",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "chargers",
  price: 29,
  stock: 50,
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b596",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  title: "Belkin USB-C to USB-A Cable",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "cables",
  price: 10,
  stock: 50,
});

productManager.create({
  _id: "2d77792cb3827935ad90806c",
  createdAt: "2024-06-28T17:17:39.308Z",
  updatedAt: "2024-06-28T17:17:39.308Z",
  title: "Samsung Wireless Earpods",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "TBD",
  price: "499",
  stock: 1,
});

export default productManager;

//TESTING
// node src/data/memory/ProductManager.js

//productManager.read()
//productManager.readOne('')
//productManager.update(1, {price: 5})
//productManager.destroy(1)
