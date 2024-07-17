import CustomRouter from "../CustomRouter.js";
import logger from "../../utils/winston.util.js";

class LoggersRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], testHTTP);
    this.read("/info", ["PUBLIC"], testINFO);
    this.read("/error", ["PUBLIC"], testERROR);
    this.read("/fatal", ["PUBLIC"], testFATAL);
  }
}

async function testHTTP (__req, res, next) {
    try {
        return res.suc200mes("HTTP log test OK. Check console for the logged results.")
    } catch (error) {
        return next(error)
    }
}

async function testINFO (__req, res, next) {
    try {
        logger.INFO("INFO log test")
        return res.suc200mes("INFO log test OK. Check console for the logged results.")
    } catch (error) {
        return next(error)
    }
}

async function testERROR (req, res, next) {
    try {
        return res.errorTest()
    } catch (error) {
        return next(error)
    }
}

async function testFATAL (req, res, next) {
    try {
        return res.fatalTest()
    } catch (error) {
        return next(error)
    }
}


const loggersRouter = new LoggersRouter();
export default loggersRouter.getRouter();



