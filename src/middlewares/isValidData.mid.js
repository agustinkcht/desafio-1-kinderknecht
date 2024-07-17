async function isValidData (req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.err400missingFieldsMailPass()
        };
        return next() 
    } catch (err) {
        return next(err);
    };
};

export default isValidData;