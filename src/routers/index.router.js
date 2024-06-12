import CustomRouter from "./CustomRouter.js";
import apiRouter from "./api/index.api.js";
import { fork } from "child_process";

class IndexRouter extends CustomRouter {
  init() {
    this.use("/api", apiRouter);
    this.read("/fork", ["PUBLIC"], (req, res, next) => {
      try {
        const childProcess = fork("./src/processes/sum.proc.js");
        childProcess.send("start");
        childProcess.on("message", (result) => {
          return res.suc200res(result);
        });
      } catch (err) {
        return next(err);
      }
    });
  };
};

const indexRouter = new IndexRouter();

export default indexRouter.getRouter();