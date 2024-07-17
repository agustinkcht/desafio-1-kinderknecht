// external dependencies
import express from "express";
import environment from "./src/utils/env.util.js";
//import dbConnect from "./src/utils/dbConnect.util.js";
import { createServer } from "http";
//import morgan from "morgan";
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
// extra for socket -not used at the moment
const nodeServer = createServer(server);
nodeServer.listen(port, handleServerStart);

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
