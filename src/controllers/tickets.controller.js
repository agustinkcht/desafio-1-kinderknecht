import cartManager from "../dao/mongo/managers/CartManager.mongo.js";
import { Types } from "mongoose";

class TicketsController {
  async generateTicket(req, res, next) {
    try {
      const uid = req.user._id;
      const ticket = await cartManager.aggregate([
        {
          $match: {
            user_id: new Types.ObjectId(uid),
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$product",
        },
        {
          $set: {
            subTotal: { $multiply: ["$quantity", "$product.price"] },
          },
        },
        {
          $group: {
            _id: "$user_id",
            total: { $sum: "$subTotal" },
          },
        },
        {
          $project: {
            _id: 0,
            user_id: "$_id",
            total: "$total",
            date: new Date(), // Adding current date
          },
        },
      ]);
      if (!ticket || ticket.length === 0) {
        // Check if ticket is empty and handle appropriately
        return res.json({
          statusCode: 404,
          message: "No tickets found for this user",
        });
      }
      return res.json({
        statusCode: 200,
        response: ticket,
      });
    } catch (error) {
      return next(error);
    }
  }
}

const ticketsController = new TicketsController();
const { generateTicket } = ticketsController; // defining
export default generateTicket;