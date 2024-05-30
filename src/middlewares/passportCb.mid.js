import passport from "passport";

// es una func q devuelve un middleware
// func q depende de la strategy a implementar... devuelve el error(si ocurre), los datos del usuario si existen, la ino correspondiente en caso de q no suceda lo anterior.


function passportCb(strategy) {
    return (req, res, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if (error) {
                return next(error)
            };
            if (user) {
                req.user = user;
                return next()
            }
            return res.json({
                statusCode: info.statusCode || 401,
                message: info.message ? info.message : info.toString
            });
        })(req, res, next);
    };
};

export default passportCb;

