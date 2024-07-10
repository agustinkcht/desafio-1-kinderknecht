import argsUtil from "../utils/args.util.js";
import crypto from "crypto";
import { createHash } from "../utils/hash.util.js";

// en base al argumento persistence, evalúo qué propiedades tengo que enviar.

const persistence = argsUtil.persistence;

class UsersDTO {
  constructor(data) {
    persistence !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    persistence !== "mongo" && (this.createdAt = new Date());
    persistence !== "mongo" && (this.updatedAt = new Date());
    this.email = data.email;
    this.password = createHash(data.password);
    this.role = data.role || 0;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.photo =
      data.photo ||
      "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png";
    this.verify = false;
    this.verifyCode = crypto.randomBytes(12).toString("hex");
  }
}

export default UsersDTO;
