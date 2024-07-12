import { faker } from "@faker-js/faker";
import dbConnect from "../utils/dbConnect.util.js";
import usersRepository from "../repositories/users.rep.js";

async function createData() {
  try {
    dbConnect();
    for (let i = 1; i <= 20; i++) {
      // creating properties
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = `${firstName.toLowerCase()}${lastName.toLowerCase()}@gmail.com`;
      const password = "s3curep4ss";
      const verify = true;
      // creating user object
      const user = { firstName, lastName, email, password, verify };
      // create with repository
      await usersRepository.createRepository(user);
    }
    console.log("Users Created");
  } catch (err) {
    console.log(err);
  }
}

createData()
