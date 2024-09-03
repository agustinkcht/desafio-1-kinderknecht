import { genSaltSync, hashSync, compareSync } from "bcrypt";

const createHash = (password) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
}; // returns hashed password, works with middleware createHashPassword

const verifyHash = (reqPass, dbPass) => { 
    const verify = compareSync(reqPass, dbPass);
    return verify;
}; // returns boolean, works straight up

export { createHash, verifyHash }



