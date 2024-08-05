import { Router } from "express";
import { verifyToken } from "../utils/token.util.js";
import usersRepository from "../repositories/users.rep.js";
import logger from "../utils/winston.util.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";

class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  } // executes the current instance/extension as a new express router & executes the init() method.
  getRouter() {
    return this.router;
  } // method for returning the current instance router.
  init() {} // code in here will be automatically executed when creating an instance
  applyCbs(cbs) {
    return cbs.map((cb) => async (...params) => {
      try {
        await cb.apply(this, params); // apply to the instance, with params (typically req, res next)
      } catch (err) {
        return params[2](err); // 3rd param (next) will handle the error if it occurs.
      }
    });
  } // applies all the callback functions (middlewares, function) using the current instance of the CustomRouter. If there is an error, it handles it.
  response = (__req, res, next) => {
    // standarized JSON responses for the requests. Meant to be used as middleware.
    //success 2xx
    res.suc200mes = (message) => res.json({ statusCode: 200, message });
    res.suc200res = (response) => res.json({ statusCode: 200, response });
    res.suc200mesres = (message, response) =>
      res.json({ statusCode: 200, message, response });
    res.suc200respag = (response, paginateInfo) =>
      res.json({ statusCode: 200, response, paginateInfo });
    res.suc200online = (user_id, email, role) =>
      res.json({ statusCode: 200, message: "Online", user_id, email, role });
    res.suc201mes = (message) => res.json({ statusCode: 201, message });
    res.suc201mesres = (message, response) =>
      res.json({ statusCode: 201, message, response });
    // ERRORS
    // passed to the custom error, that uses error dictionary to craft a new Error object and throws it into the error handler.
    // every error now goes on & on to the error handler.
    //testing
    res.errorTest = () => {
      CustomError.new(errors.errorTest);
    };
    res.fatalTest = () => {
      CustomError.new(errors.fatalTest);
    };
    // 400 - bad request
    res.err400 = () => {
      CustomError.new(errors.err400);
    };
    // cart item
    res.err400addCartItem = () => {
      CustomError.new(errors.err400addCartItem);
    };
    res.err400updateCartItem = () => {
      CustomError.new(errors.err400updateCartItem);
    };
    // code
    res.err400invalidCode = () => {
      CustomError.new(errors.err400invalidCode);
    };
    // missing fields
    res.err400missingFields = () => {
      CustomError.new(errors.err400missingFields);
    };
    // 401 - unauthorized
    res.err401 = () => {
      CustomError.new(errors.err401);
    };
    // invalid credentials
    res.err401invalidCredentials = () => {
      CustomError.new(errors.err401invalidCredentials);
    };
    res.err401userNotVerified = () => {
      CustomError.new(errors.err401userNotVerified);
    };
    res.err401noSession = () => {
      CustomError.new(errors.err401noSession);
    };
    res.err401offline = () => {
      CustomError.new(errors.err401offline);
    };
    // 403 - forbidden
    res.err403 = () => {
      CustomError.new(errors.err403);
    };
    // 404 - not found
    res.err404 = () => {
      CustomError.new(errors.err404);
    };
    res.err404cart = () => {
      CustomError.new(errors.err404cart);
    };
    res.err404itemsCart = () => {
      CustomError.new(errors.err404itemsInCart);
    };
    res.err404item = () => {
      CustomError.new(errors.err404item);
    };
    res.err404info = () => {
      CustomError.new(errors.err404info);
    };
    res.err404product = () => {
      CustomError.new(errors.err404product);
    };
    res.err404user = () => {
      CustomError.new(errors.err404user);
    };
    // 409 - resource conflict
    res.err409emailAlreadyTaken = () => {
      CustomError.new(errors.err409emailAlreadyTaken);
    };
    // 500 - internal server error - fatal
    res.err500fatal = () => {
      CustomError.new(errors.err500fatal);
    };
    return next();
  };
  policies = (policiesArray) => async (req, res, next) => {
    try {
      if (policiesArray.includes("PUBLIC")) return next();
      let token = req.cookies.token;
      if (!token) return res.err401noSession();
      token = verifyToken(token); // uses verifyToken to de-tokenize the data
      const { role, email } = token;
      if (
        (policiesArray.includes("USER") && role === 0) ||
        (policiesArray.includes("ADMIN") && role === 1)
      ) {
        const user = await usersRepository.readByEmailRepository(email);
        delete user.password; // protecting password.
        req.user = user; // incorporate user object to the req object
        return next();
      } else {
        return res.err403();
      }
    } catch (err) {
      return next(err);
    }
  };
  create(path, policiesArray, ...cbs) {
    this.router.post(
      path,
      this.response,
      this.policies(policiesArray),
      this.applyCbs(cbs)
    );
  }
  read(path, policiesArray, ...cbs) {
    this.router.get(
      path,
      this.response,
      this.policies(policiesArray),
      this.applyCbs(cbs)
    );
  }
  update(path, policiesArray, ...cbs) {
    this.router.put(
      path,
      this.response,
      this.policies(policiesArray),
      this.applyCbs(cbs)
    );
  }
  destroy(path, policiesArray, ...cbs) {
    this.router.delete(
      path,
      this.response,
      this.policies(policiesArray),
      this.applyCbs(cbs)
    );
  }
  use(path, ...cbs) {
    this.router.use(path, this.response, this.applyCbs(cbs));
  }
}

export default CustomRouter;
