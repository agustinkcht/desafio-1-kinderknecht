async function isValidData (req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.err400mes("Enter a valid email")
        };
        if (!password) {
            return res.err400mes("Enter a valid password")
        };
        return next() 
    } catch (err) {
        return next(err);
    };
};

export default isValidData;