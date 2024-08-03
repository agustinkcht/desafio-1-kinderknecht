import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { createHash } from "../utils/hash.util.js";
import { verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import usersRepository from "../repositories/users.rep.js";
import { sendVerificationEmail } from "../utils/mailing.util.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const one = await usersRepository.readByEmailRepository(email);
        if (one) {
          const error = CustomError.new(errors.err409emailAlreadyTaken);
          return done(error);
        }
        // crafting user
        const hashPassword = createHash(password);
        password = hashPassword;
        const data = req.body;
        const user = await usersRepository.createRepository(data);
        // send email
        await sendVerificationEmail({
          to: email,
          name: user.firstName,
          code: user.verificationCode,
        });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (_req, email, password, done) => {
      try {
        const one = await usersRepository.readByEmailRepository(email);
        if (!one) {
          const error = CustomError.new(errors.err401invalidCredentials);
          return done(error);
        }
        // check for password and verify:true
        const verifyPassword = verifyHash(password, one.password);
        const verifyAccount = one.verified;
        if (!verifyPassword) {
          const error = CustomError.new(errors.err401invalidCredentials);
          return done(error);
        }
        if (!verifyAccount) {
          const error = CustomError.new(errors.err401userNotVerified);
          return done(error);
        }
        const user = {
          email,
          role: one.role,
          photo: one.photo,
          _id: one._id,
          online: true,
        }; // creates the object to tokenize.
        const token = createToken(user);
        user.token = token;
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/sessions/google/callback",
      passReqToCallback: true,
    },
    async (req, __accessToken, __refreshToken, profile, done) => {
      try {
        const { id, picture } = profile;
        let user = await usersRepository.readByEmailRepository(id);
        if (!user) {
          user = {
            email: id,
            password: createHash(id),
            photo: picture,
          };
          user = await usersRepository.createRepository(user);
        }
        req.session.email = user.email;
        req.session.online = true;
        req.session.role = user.role;
        req.session.photo = user.photo;
        req.session.user_id = user._id;
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: process.env.SECRET_JWT,
    }, // extracts the JWT from the cookies, and decryptes it
    (data, done) => {
      // data is the actual decrypted payload
      try {
        if (data) {
          return done(null, data); // pass the payload to the next middleware.
        } else {
          const error = CustomError.new(errors.err403);
          return done(error);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;
