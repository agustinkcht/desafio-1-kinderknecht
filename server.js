// external dependencies
import express from "express";
import environment from "./src/utils/env.util.js";
import cluster from "cluster";
import { cpus } from "os";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "express-compression";
//internal modules
import __dirname from "./utils.js";
import winston from "./src/middlewares/winston.mid.js";
import indexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import notFoundHandler from "./src/middlewares/notFoundHandler.js";
import argsUtil from "./src/utils/args.util.js";
import logger from "./src/utils/winston.util.js";

// server init
const server = express();
const port = environment.PORT || argsUtil.p;
const handleServerStart = async () => {
  logger.INFO(`Server is now running on port ${port}`);
};
const nodeServer = createServer(server);
// cluster config
const cores = cpus().length; // cores of the computer (8)

if (cluster.isPrimary) {
  console.log("primary process");
  for (let i=1; i <= cores; i++) {
    cluster.fork();
  }
} else {
  console.log("worker process" + process.pid);
  nodeServer.listen(port, handleServerStart);
}

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(winston);
server.use(cookieParser(environment.SECRET_COOKIE));
server.use(cors({ origin: true, credentials: true }));
server.use(
  compression({
    brotli: { enable: true, zlib: {} },
  })
);

// router
server.use("/", indexRouter);
server.use(errorHandler);
server.use(notFoundHandler);
