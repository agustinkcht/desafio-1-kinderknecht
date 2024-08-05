import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

const persistence = argsUtil.persistence;

class ProductsDTO {
  constructor(data) {
    persistence !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.title = data.title;
    this.photo =
      data.photo ||
      "https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png";
    this.category = data.category || "TBD";
    this.price = data.price || 1;
    this.stock = data.stock || 1;
    persistence !== "mongo" && (this.createdAt = new Date());
    persistence !== "mongo" && (this.updatedAt = new Date());
  }
}

export default ProductsDTO;
