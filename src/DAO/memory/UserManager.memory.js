class UserManager {
  static #users = [];
  create(data) {
    try {
      UserManager.#users.push(data);
      return data;
    } catch (err) {
      throw err;
    }
  }
  read() {
    try {
      console.log(UserManager.#users);
    } catch (err) {
      throw err;
    }
  }
  paginate({ filter = {}, opts = {} }) {
    try {
      let allUsers = UserManager.#users;
      if (filter.role) {
        allUsers = allUsers.filter((user) => user.role === filter.role);
      }
      const totalDocs = allUsers.length;
      const limit = opts.limit || 10;
      const page = opts.page || 1;
      const totalPages = Math.ceil(totalDocs / limit);
      const offset = (page - 1) * limit;
      const paginatedUsers = allUsers.slice(offset, offset + limit);
      const paginateInfo = {
        page,
        totalPages,
        limit,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null,
        totalDocs,
      };
      return { docs: paginatedUsers, ...paginateInfo };
    } catch (err) {
      throw err;
    }
  }
  readOne(id) {
    try {
      let allUsers = UserManager.#users;
      let selected = allUsers.find((each) => each._id === id);
      return selected;
    } catch (err) {
      throw err;
    }
  }
  readByEmail(email) {
    try {
      let allUsers = UserManager.#users;
      let selected = allUsers.find((each) => each.email === email);
      return selected;
    } catch (err) {
      throw err;
    }
  }
  destroy(id) {
    try {
      let allUsers = UserManager.#users;
      let selected = allUsers.find((each) => each._id === id);
      let withoutSelected = allUsers.filter((each) => each._id !== id);
      UserManager.#users = withoutSelected;
      return selected;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  update(id, data) {
    try {
      let allUsers = UserManager.#users;
      let selected = allUsers.find((each) => each._id === id);
      for (let prop in data) {
        selected[prop] = data[prop];
      }
      UserManager.#users.push(selected);
      return selected;
    } catch (err) {
      throw err;
    }
  }
}

const userManager = new UserManager();

userManager.create({
  _id: "66818054e857f2ed5dbf802c",
  email: "wendycarlos@gmail.com",
  password: "$2b$10$hdkmZY8m7hjg7WsU4XnmTubFT0ApNG1LHQg4MV5kCGbLdLQ1mNvca",
  firstName: "Wendy",
  lastName: "Carlos",
  age: 84,
  role: 1,
  photo: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
  verified: true,
  verificationCode: "3712cc5816166ef4293b2c8b",
  createdAt: "2024-06-22T15:07:25.193Z",
  updatedAt: "2024-06-22T15:07:25.193Z"
});

userManager.create({
  _id: "6681805ee857f2ed5dbf802e",
  email: "bobmoog@gmail.com",
  password: "$2b$10$c0sIR.R36RWbmAboJpt6dOAjNqX4TE4fk1HPVEW5aglPoLtJRhKYC",
  firstName: "Robert",
  lastName: "Moog",
  age: 90,
  role: 1,
  photo: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
  verified: true,
  verificationCode: "38a956cc75f9a344eb30641a",
  createdAt: "2024-06-22T15:07:25.193Z",
  updatedAt: "2024-06-22T15:07:25.193Z"
});

userManager.create({
  _id: "66818074e857f2ed5dbf8030",
  email: "pietropiccioni@gmail.com",
  password: "$2b$10$/cyHhsNZqtQ7Nn7OximAD.D.Pr8GOKyATKWRHDaDP3A9yn6EXkAGG",
  firstName: "Pietro",
  lastName: "Piccioni",
  age: 29,
  role: 0,
  photo: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
  verified: true,
  verificationCode: "fe7d503dc385088795c74802",
  createdAt: "2024-06-22T15:07:25.193Z",
  updatedAt: "2024-06-22T15:07:25.193Z"
});

userManager.create({
  _id: "668180cbe857f2ed5dbf8034",
  email: "charlesgardes@gmail.com",
  password: "$2b$10$MQOE90ZUrshWwRLeHjg79uV8U.ygNWsPK9hFeySPEGIPrrHj5TX86",
  firstName: "Charles",
  lastName: "Gardes",
  age: 42,
  role: 0,
  photo: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
  verified: true,
  verificationCode: "21e1a4b6e839e763c472df67",
  createdAt: "2024-06-22T15:07:25.193Z",
  updatedAt: "2024-06-22T15:07:25.193Z"
});

export default userManager;

//TESTING
// node src/data/memory/UserManager.js

//userManager.read()
//userManager.readOne('')
//userManager.update(1, {price: 5})
//userManager.destroy(1)
