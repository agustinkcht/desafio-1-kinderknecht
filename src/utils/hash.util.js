import { genSaltSync, hashSync, compareSync } from "bcrypt";

const createHash = (password) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
};

const verifyHash = (reqPass, dbPass) => {
    const verify = compareSync(reqPass, dbPass);
    return verify;
};

export { createHash, verifyHash }



