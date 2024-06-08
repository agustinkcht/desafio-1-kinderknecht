import jwt from 'jsonwebtoken';

const createToken = (data) => {
    try {
        const opts = { expiresIn: 60 * 60 * 24 }; // 1 dia
        const token = jwt.sign(data, process.env.SECRET_JWT, opts);
        return token;
    } catch (err) {
        console.error('Error creating token')
        throw err;
    };
}; // receives object and returns it 'tokenized'. this should be used when starting the session.

const verifyToken = (token) => {
    try {
        const data = jwt.verify(token, process.env.SECRET_JWT);
        return data; 
    } catch (err) {
        console.error('Error verifying token')
        throw err;
    };
}; // receives token and 'de-tokenizes' it, retrieving the de-encrypted data.

export { createToken, verifyToken };
