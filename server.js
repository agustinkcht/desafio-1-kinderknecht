import express from "express";
import morgan from "morgan";
import indexRouter from "./routers/index.router.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";

// server init
const server = express();
const port = 8080;
const handleServerStart = () => {
    console.log(`Server is now running on port ${port}`)
};
server.listen(port, handleServerStart);

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan('dev'));

// router
server.use('/', indexRouter);

// middlewares
server.use(errorHandler);
server.use(notFoundHandler);










