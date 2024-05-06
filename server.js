// external dependencies
import express from "express";
import "dotenv/config.js"
import dbConnect from "./src/utils/dbConnect.util.js";
import { createServer } from "http";
import { engine } from "express-handlebars";
import morgan from "morgan";
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
// extra for socket
const nodeServer = createServer(server);
nodeServer.listen(port, handleServerStart);

// handlebars init
server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
server.set('views', __dirname + '/src/views');

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(morgan('dev'));

// router
server.use('/', indexRouter);
server.use(errorHandler);
server.use(notFoundHandler);










