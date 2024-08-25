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
      return selected;
    } catch (err) {
      throw err;
    }
  }
  destroy(id) {
    try {
      let allProducts = ProductManager.#products;
      let selected = allProducts.find((product) => product._id === id);
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
      for (let prop in data) {
        selected[prop] = data[prop];
      }
      ProductManager.#products.push(selected);
      return selected;
    } catch (err) {
      throw err;
    }
  }
}

const productManager = new ProductManager();

productManager.create({
  _id: "663cea2c57109ba2e5d3b56f",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "Airpods Pro 2",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "accessories",
  price: 249,
  stock: 40,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b570",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "Apple EarPods",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "accessories",
  price: 89,
  stock: 40,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b571",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "Airpods Max",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "accessories",
  price: 549,
  stock: 40,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b572",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "Airpods 3rd gen",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "accessories",
  price: 169,
  stock: 40,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b573",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "iPhone 15 Pro",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "phones",
  price: 999,
  stock: 30,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b574",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "iPhone 14",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "phones",
  price: 699,
  stock: 30,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b575",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "Apple Watch 9",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "watches",
  price: 399,
  stock: 35,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b576",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "MacBook Air 13 M2",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "laptops",
  price: 999,
  stock: 20,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b577",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "MacBook Pro 14 M3",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "laptops",
  price: 1399,
  stock: 20,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b578",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "Mac Studio M2 Max",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "computers",
  price: 1999,
  stock: 20,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b579",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "iPhone SE Plus",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "phones",
  price: 499,
  stock: 30,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b57a",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "iPhone XR2",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "phones",
  price: 599,
  stock: 30,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b57b",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "iPhone 11",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "phones",
  price: 599,
  stock: 30,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b57c",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "iPhone XS",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "phones",
  price: 899,
  stock: 30,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b57d",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "iPhone 8",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "phones",
  price: 499,
  stock: 30,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b57e",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "iPhone 7 Plus",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "phones",
  price: 549,
  stock: 30,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b57f",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "AirPods Pro Lite",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "accessories",
  price: 199,
  stock: 40,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b580",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "AirTag Keychain",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "accessories",
  price: 29,
  stock: 40,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b581",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "AirTag Leather Loop",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "accessories",
  price: 39,
  stock: 40,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663cea2c57109ba2e5d3b582",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "Apple Watch Series 8",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "accessories",
  price: 449,
  stock: 35,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b583",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "Apple Watch Sport Loop Band",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "accessories",
  price: 49,
  stock: 35,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b584",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "Apple Watch Milanese Loop Band",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "accessories",
  price: 99,
  stock: 35,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b585",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "MacBook Pro 16 M4",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "laptops",
  price: 2499,
  stock: 20,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b586",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "MacBook Air 14 M2",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "laptops",
  price: 1199,
  stock: 20,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b587",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "iMac Pro 32-inch",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "computers",
  price: 3499,
  stock: 20,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b588",
  supplier_id: "66918b794d21c1bc0efdd69e",
  title: "Mac Mini Pro",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "computers",
  price: 1499,
  stock: 20,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b589",
  supplier_id: "6691882c4d21c1bc0efdd683",
  title: "Anker PowerPort Atom III",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "chargers",
  price: 39,
  stock: 50,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b58a",
  supplier_id: "6691882c4d21c1bc0efdd683",
  title: "RAVPower 30W 2-Port Wall Charger",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "chargers",
  price: 19,
  stock: 50,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b58b",
  supplier_id: "6691882c4d21c1bc0efdd683",
  title: "Belkin Boost Charge 27W USB-C Wall Charger",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "chargers",
  price: 29,
  stock: 50,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b58c",
  supplier_id: "6691882c4d21c1bc0efdd683",
  title: "AmazonBasics Nylon Braided Lightning to USB-A Cable",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "cables",
  price: 12,
  stock: 50,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b58d",
  supplier_id: "6691882c4d21c1bc0efdd683",
  title: "UGREEN USB-C to 3.5mm Headphone Jack Adapter",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "cables",
  price: 9,
  stock: 50,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b58e",
  supplier_id: "6691882c4d21c1bc0efdd683",
  title: "Anker Soundcore Life Q20 Hybrid Active Noise Cancelling Headphones",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "headphones",
  price: 59,
  stock: 50,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b58f",
  supplier_id: "6691882c4d21c1bc0efdd683",
  title: "Sony WH-1000XM4 Wireless Noise Cancelling Headphones",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "headphones",
  price: 279,
  stock: 50,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b590",
  supplier_id: "6691882c4d21c1bc0efdd683",
  title: "Bose QuietComfort 45 Wireless Headphones",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "headphones",
  price: 329,
  stock: 50,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b591",
  supplier_id: "6691882c4d21c1bc0efdd683",
  title: "JBL Tune 750BTNC Wireless Over-Ear Headphones",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "headphones",
  price: 129,
  stock: 50,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b592",
  supplier_id: "6691882c4d21c1bc0efdd683",
  title: "Sennheiser HD 450BT Wireless Noise Cancelling Headphones",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "headphones",
  price: 199,
  stock: 50,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b593",
  supplier_id: "6691882c4d21c1bc0efdd683",
  title: "Samsung Fast Charge Wireless Charging Stand",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "chargers",
  price: 49,
  stock: 50,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b594",
  supplier_id: "6691882c4d21c1bc0efdd683",
  title: "Mophie Dual Wireless Charging Pad",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "chargers",
  price: 69,
  stock: 50,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b595",
  supplier_id: "6691882c4d21c1bc0efdd683",
  title: "Roku Wireless Charging Pad",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "chargers",
  price: 29,
  stock: 50,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});

productManager.create({
  _id: "663ceb1057109ba2e5d3b596",
  supplier_id: "6691882c4d21c1bc0efdd683",
  title: "Belkin USB-C to USB-A Cable",
  photo:
    "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png",
  category: "cables",
  price: 10,
  stock: 50,
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z"
});


export default productManager;

//TESTING
// node src/data/memory/ProductManager.js

//productManager.read()
//productManager.readOne('')
//productManager.update(1, {price: 5})
//productManager.destroy(1)
