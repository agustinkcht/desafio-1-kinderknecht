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
  read(role) {
    try {
      console.log(UserManager.#users);
    } catch (err) {
      console.log("Unable to find the users");
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
      if (!selected) {
        throw new Error(
          "No user found with the specified ID. Please check the ID and try again."
        );
      } else {
        return selected;
      }
    } catch (err) {
      throw err;
    }
  }
  readByEmail(email) {
    try {
      let allUsers = UserManager.#users;
      let selected = allUsers.find((each) => each.email === email);
      if (!selected) {
        throw new Error(
          "No user found with the specified ID. Please check the ID and try again."
        );
      } else {
        return selected;
      }
    } catch (err) {
      throw err;
    }
  }
  destroy(id) {
    try {
      let allUsers = UserManager.#users;
      let selected = allUsers.find((each) => each._id === id);
      if (!selected) {
        throw new Error(
          "No user found with the specified ID. Please check the ID and try again."
        );
      } else {
        let withoutSelected = allUsers.filter((each) => each._id !== id);
        UserManager.#users = withoutSelected;
        return selected;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  update(id, data) {
    try {
      let allUsers = UserManager.#users;
      let selected = allUsers.find((each) => each._id === id);
      if (selected) {
        for (let prop in data) {
          selected[prop] = data[prop];
        }
        UserManager.#users.push(selected);
        return selected;
      } else {
        const error = new Error(
          "No user found with the specified ID. Please check the ID and try again."
        );
        error.statusCode = 404;
        throw error;
      }
    } catch (err) {
      throw err;
    }
  }
}

const userManager = new UserManager();

userManager.create({
  _id: "eb4b0494a2004d277fa4b664",
  createdAt: "2024-06-22T15:07:25.193Z",
  updatedAt: "2024-06-22T15:07:25.193Z",
  email: "stevejobs@gmail.com",
  password: "$2b$10$u6Hl9KUY9Xru0q4ViKZudu8UZ22LW2Zeob6RWgZ1FDsz/zCgWbuJq",
  role: 0,
  photo: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
});

userManager.create({
  _id: "e859ab9088cc0079b5dc91e2",
  createdAt: "2024-06-22T15:13:03.816Z",
  updatedAt: "2024-06-22T15:13:03.816Z",
  email: "mariadelmario@gmail.com",
  password: "$2b$10$amMAvkE1YadabEJCVZV6uehQk7wrAyQ/tXmeNUZNTu6Z0UArpL0X.",
  role: 1,
  photo: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
});

userManager.create({
  _id: "ecbeb95cb523a198963b2a7b",
  createdAt: "2024-06-26T18:10:45.461Z",
  updatedAt: "2024-06-26T18:10:45.461Z",
  email: "maurodemaria@gmail.com",
  password: "$2b$10$Ui/xeEkEl9z3pOviCLY6KehgN4rm2VWJ.PEdIg1t5t.0AQij7lIji",
  role: 0,
  photo: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
});

userManager.create({
  _id: "63a226f6746dfa127bc9afe5",
  createdAt: "2024-06-26T18:26:18.338Z",
  updatedAt: "2024-06-26T18:26:18.338Z",
  email: "mariedemauro@gmail.com",
  password: "$2b$10$lKPdG4miVgBY5SN4pnXlz.8n7DkudA30W00Pyl7Bmu4lBNrBHehZq",
  role: 0,
  photo: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
});

userManager.create({
  _id: "8a4df7cde9aae1abd59092c3",
  createdAt: "2024-06-26T19:38:09.869Z",
  updatedAt: "2024-06-26T19:38:09.869Z",
  email: "cachorrolopez@gmail.com",
  password: "$2b$10$Mu4SriU./pdsgDCR83LWAeuxZFvCmCfFZkI791G0/qdppLZwG6WIO",
  role: 0,
  photo: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
});

userManager.create({
  _id: "01d3c7f2758277fa04c9a1eb",
  createdAt: "2024-06-28T17:14:52.745Z",
  updatedAt: "2024-06-28T17:14:52.745Z",
  email: "maurodemariano@gmail.com",
  password: "$2b$10$5lHjoxcya4CQ28V6WzkCGuKOb7DRBZvwU/fdijM0m7fMSVeEXGIqu",
  role: 0,
  photo: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
});

export default userManager;




//TESTING
// node src/data/memory/UserManager.js

//userManager.read()
//userManager.readOne('')
//userManager.update(1, {price: 5})
//userManager.destroy(1)
