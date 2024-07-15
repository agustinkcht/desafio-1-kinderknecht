import { createLogger, format, addColors, transports } from "winston";

const { colorize, simple } = format; // two methods to apply color
const { Console, File } = transports; // place of registration
// console for dev, file for prod

const levels = { FATAL: 0, ERROR: 1, INFO: 2, HTTP: 3 }; // fatal are the 5xx
const colors = { FATAL: "red", ERROR: "yellow", INFO: "blue", HTTP: "white" };
addColors(colors); // assigns the color to the level
// convention: the worst, the redder (or darker)
                                    
const logger = createLogger({
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
// Console for HTTP and above (all levels), File for ERROR and above (err & fat)

export default logger;
