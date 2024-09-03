import argsUtil from "../utils/args.util.js";
import crypto from "crypto";
import { createHash } from "../utils/hash.util.js";

// DTO is basically a data object formatter.
// When we create a user, we take DATA coming from postman or the input form.
// This data is then processed and carried to the persistence's database.

// as we are handling more than one persistence, we need the data stored to have the same format (fields and values) in all persistencies. That is why we use a DTO.

const persistence = argsUtil.persistence;
// based on persistence, i send extra data or not.

class UsersDTO {
  constructor(data) {
    persistence !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.email = data.email;
    this.password = createHash(data.password);
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.age = data.age || 18;
    this.role = data.role || 0;
    this.photo =
      data.photo ||
      "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png";
    this.verified = data.verified || false;
    this.verificationCode = crypto.randomBytes(12).toString("hex");
    persistence !== "mongo" && (this.createdAt = new Date());
    persistence !== "mongo" && (this.updatedAt = new Date());
  }
}

export default UsersDTO;
