// external dependencies
import express from "express";
import "dotenv/config.js"
import dbConnect from "./src/utils/dbConnect.util.js";
import { createServer } from "http";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
//internal modules
import __dirname from "./utils.js";
import indexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js"
import notFoundHandler from "./src/middlewares/notFoundHandler.js";

// server init
const server = express();
const port = process.env.PORT || 8080;
const handleServerStart = async () => {
    console.log(`Server is now running on port ${port}`);
    await dbConnect();
};
// extra for socket -not used at the moment
const nodeServer = createServer(server);
nodeServer.listen(port, handleServerStart);

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(morgan('dev'));
server.use(cookieParser(process.env.SECRET_COOKIE));
server.use(session({
    store: new MongoStore({
        mongoUrl: process.env.MONGO_URI,
        ttl: 60 * 60
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
}));

// router
server.use('/', indexRouter);
server.use(errorHandler);
server.use(notFoundHandler);










