import express from "express";
import { createServer } from "http";
import { Server } from 'socket.io';
import morgan from "morgan";
import { engine } from "express-handlebars";
import indexRouter from "./src/routers/index.router.js";
import socketCb from './src/routers/index.socket.js';
import errorHandler from "./src/middlewares/errorHandler.js"
import notFoundHandler from "./src/middlewares/notFoundHandler.js";
import __dirname from "./utils.js";


// server init
const server = express();
const port = 8080;
const handleServerStart = () => {
    console.log(`Server is now running on port ${port}`)
};
// extra for socket
const nodeServer = createServer(server);
const socketServer = new Server(nodeServer);
socketServer.on('connection', socketCb);
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










