async function isValidAdmin (req, res, next) {
    try {
        const { role } = req.session;
        console.log(role)
        if(role === '1') {
            return next()
        } else {
            const error = new Error('Action not allowed');
            error.statuCode = 403;
            throw error;
        }
    } catch (err) {
        return next(err);
    };
};

export default isValidAdmin;

