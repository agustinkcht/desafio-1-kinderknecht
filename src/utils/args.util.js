import { Command } from "commander";

const args = new Command();

args.option("-p <port>", "port", 8080);
args.option("--env <env>", "environment", "prod");
args.option("--persistence <persistence>", "persistence", "mongo");
// 1. flag, 2. description, 3. default

args.parse();

export default args.opts();
  



