import CustomRouter from "./CustomRouter.js";

class ArtilleryRouter extends CustomRouter {
  init() {
    this.read("/simplex", ["PUBLIC"], (__req, res, next) => {
      try {
        let total = 1;
        for (let i = 1; i < 100; i++) {
          total = i * i;
        }
        return res.send({ total });
      } catch (err) {
        return next(err);
      }
    });
    this.read("/complex", ["PUBLIC"], (__req, res, next) => {
      try {
        let total = 1;
        for (let i = 1; i < 5000000000; i++) {
          total = i * i;
        }
        return res.send({ total });
      } catch (err) {
        return next(err);
      }
    });
  }
}

const artilleryRouter = new ArtilleryRouter();
export default artilleryRouter.getRouter();
