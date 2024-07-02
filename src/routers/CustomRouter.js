import { Router } from "express";
import { verifyToken } from "../utils/token.util.js";
import usersRepository from "../repositories/users.rep.js";

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
  response = (req, res, next) => {
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
    //error 4xx
    res.err400mes = (message) => res.json({ statusCode: 400, message });
    res.err401mes = (message) => res.json({ statusCode: 401, message });
    res.err403 = () =>
      res.json({ statusCode: 403, message: "Forbidden From Policies" });
    res.err403mes = () => res.json({ statusCode: 403, message });
    res.err404 = () => res.json({ statusCode: 404, message: "Not Found" });
    res.err404mes = (message) => res.json({ statusCode: 404, message });
    res.err409mes = (message) => res.json({ statusCode: 409, message })
    return next();
  };
  policies = (policiesArray) => async (req, res, next) => {
    try {
      if (policiesArray.includes("PUBLIC")) return next();
      let token = req.cookies.token;
      if (!token) return res.err401mes("Bad Auth From Policies - No token - No session opened");
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
