import { createLogger, format, addColors, transports } from "winston";
import argsUtil from "./args.util.js";

const { colorize, simple } = format; // two methods to apply color
const { Console, File } = transports; // place of registration
// console for dev, file for prod

const levels = { FATAL: 0, ERROR: 1, INFO: 2, HTTP: 3 }; // fatal are the 5xx
const colors = { FATAL: "red", ERROR: "yellow", INFO: "blue", HTTP: "white" };
addColors(colors); // assigns the color to the level
// convention: the worst, the redder (or darker)

// logger 1 : console for all leves - file from ERROR.
const logger1 = createLogger({
  levels,
  format: colorize(),
  transports: [
    new Console({ level: "HTTP", format: simple() }),
    new File({
      level: "ERROR",
      format: simple(),
      filename: "./src/utils/errors/errors.log",
    }),
  ],
});

// logger 2 : only console.
const logger2 = createLogger({
  levels,
  format: colorize(),
  transports: [new Console({ level: "HTTP", format: simple() })],
});

const environment = argsUtil.env;
let logger;

switch (environment) {
  case "dev":
    logger = logger2;
    break;
  case "prod":
    logger = logger1;
    break;
  default:
    logger = logger2;
    break;
}

export default logger;
