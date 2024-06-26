class UserManager {
  static #users = [];
  create(data) {
    try {
      UserManager.#users.push(data);
      console.log("User successfully created");
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
        console.log("User deleted");
        console.log(UserManager.#users);
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
        console.log("The user data has been updated successfully");
        console.log(selected);
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

export default userManager;

// userManager.create({
//     photo: 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png',
//     email: 'johndoe123@email.com',
//     password: 'P@ssw0rd123',
//     role: 0
// });

// userManager.create({
//     photo: 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png',
//     email: 'sarahsmith456@email.com',
//     password: 'SecurePass789!',
//     role: 1
// });

// userManager.create({
//     photo: 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png',
//     email: 'lisawilliams432@email.com',
//     password: 'William$L1sa',
//     role: 0
// });

// userManager.create({
//     photo: 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png',
//     email: 'emilybrown321@email.com',
//     password: 'Brownie1234$',
//     role: 0
// });

//TESTING
// node src/data/memory/UserManager.js

//userManager.read()
//userManager.readOne('')
//userManager.update(1, {price: 5})
//userManager.destroy(1)
