import { faker } from "@faker-js/faker";
import dbConnect from "../utils/dbConnect.util.js";
import usersRepository from "../repositories/users.rep.js";

async function createData() {
  try {
    dbConnect();
    for (let i = 1; i <= 5; i++) {
      // creating properties
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = `${firstName.toLowerCase()}${lastName.toLowerCase()}@gmail.com`;
      const password = "s3curep4ss";
      const age = faker.number.int({ min: 18, max: 63 });
      const role = faker.number.binary();
      const photo = faker.image.avatar();
      const verified = true;
      // creating user object
      const user = { email, password, firstName, lastName, age, role, photo, verified };
      // create with repository
      await usersRepository.createRepository(user);
    }
    console.log("Users Created");
  } catch (err) {
    console.log(err);
  }
}

createData()
