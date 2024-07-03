import argsUtil from "../utils/args.util.js";
import dbConnect from "../utils/dbConnect.util.js"

const persistence = argsUtil.persistence
let dao = {}

switch (persistence) {
    case "memory":
        console.log("Connected to memory")
        const { default: userManagerMemory } = await import("./memory/UserManager.memory.js");
        const { default: productManagerMemory } = await import("./memory/ProductManager.memory.js");
        const { default: cartManagerMemory } = await import("./memory/CartManager.memory.js");
        dao = { userManager: userManagerMemory, productManager: productManagerMemory, cartManager: cartManagerMemory };
        break;
    case "fs":
        console.log("Connected to file system")
        const { default: userManagerFs } = await import("./fs/files/UserManager.fs.js");
        const { default: productManagerFs } = await import("./fs/files/ProductManager.fs.js");
        const { default: cartManagerFs } = await import("./fs/files/CartManager.fs.js");
        dao = { userManager: userManagerFs, productManager: productManagerFs, cartManager: cartManagerFs };
        break;
    default:
        console.log("Connected to Mongo database")
        dbConnect();
        const { default: userManagerMongo } = await import("./mongo/managers/UserManager.mongo.js");
        const { default: productManagerMongo } = await import("./mongo/managers/ProductManager.mongo.js");
        const { default: cartManagerMongo } = await import("./mongo/managers/CartManager.mongo.js");
        dao = { userManager: userManagerMongo, productManager: productManagerMongo, cartManager: cartManagerMongo }; 
        break;    
};

export default dao;




