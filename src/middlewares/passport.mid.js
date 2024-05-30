import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import userManager from "../data/mongo/managers/UserManager.mongo.js"
import { createHash } from "../utils/hash.util.js";
import { verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";

passport.use('register',
    new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, email, password, done) => {
            try {
                if (!email || !password) {
                    const error = new Error('Enter a valid email and password')
                    error.statusCode = 400;
                    return done(null, null, error);
                };
                const one = await userManager.readByEmail(email);
                if (one) {
                    const error = new Error('Invalid email. Use a different email or log in')
                    error.statusCode = 409;
                    return done(error)
                };
                const hashPassword = createHash(password);
                req.body.password = hashPassword;
                const user = await userManager.create(req.body)
                return done(null, user)
            } catch (err) {
               return done(err)              
            };
        }
    )
);

passport.use('login',
    new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, email, password, done) => {
            try {
                const one = await userManager.readByEmail(email);
                if (!one) {
                    const error = new Error('Bad auth from login. Check login info and try again.')
                    error.statusCode = 401;
                    return done(error)
                };
                const verify = verifyHash(password, one.password);
                if (!verify) {
                    const error = new Error('Invalid Credentials');
                    error.statusCode = 401;
                    throw error;
                }; 
                const user = {
                    email,
                    role: one.role,
                    photo: one.photo,
                    _id: one._id,
                    online: true
                };
                const token = createToken(user);
                user.token = token;
                return done(null, user);
            } catch (err) {
                return done(err);       
            };
        }
    )
);

passport.use('google',
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:8080/api/sessions/google/callback',
            passReqToCallback: true
        },
        async(req, accessToken, refreshToken, profile, done) => {
            try {
                const { id, picture } = profile;
                console.log(profile)
                let user = await userManager.readByEmail(id);
                if (!user) {
                    user = {
                        email: id,
                        password: createHash(id),
                        photo: picture
                    }
                    user = await userManager.create(user)
                }
                req.session.email = user.email;
                req.session.online = true;
                req.session.role = user.role;
                req.session.photo = user.photo;
                req.session.user_id = user._id;
                return done(null, user);  
            } catch (err) {
                return done(err)      
            };
        }
    )
);

passport.use('jwt',
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies['token']]),
            secretOrKey: process.env.SECRET_JWT,
        },
        (data, done) => {
            try {
                if (data) {
                    return done(null, data)  
                } else {
                    const error = new Error('Forbidden from JWT')
                    error.statusCode = 403;
                    return done(error)
                };          
            } catch (err) {
                return done(err)           
            };
        }
    )
);

export default passport;



