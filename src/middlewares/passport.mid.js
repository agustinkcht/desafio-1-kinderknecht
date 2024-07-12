import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { createHash } from "../utils/hash.util.js";
import { verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import usersRepository from "../repositories/users.rep.js";
import sendEmail from "../utils/mailing.util.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        if (!email || !password) {
          const error = new Error("Enter a valid email and password");
          error.statusCode = 400;
          return done(null, null, error);
        }
        const one = await usersRepository.readByEmailRepository(email);
        if (one) {
          const error = new Error(
            "Email already taken. Use a different email or log in"
          );
          error.statusCode = 409;
          return done(error);
        }
        const hashPassword = createHash(password);
        password = hashPassword;
        const data = req.body;
        const user = await usersRepository.createRepository(data);
        // una vez que el usuario se creó, la estrategia debe enviar un email
        // con un codigo aleatorio para la verificacion (con crypto)
        console.log("pre email")
        await sendEmail({ // passes to, name and code to the function.
          to: email,
          name: user.firstName,
          code: user.verificationCode,
        });
        console.log("after email")
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
          const error = new Error(
            "Bad auth from login. Check login info and try again."
          );
          error.statusCode = 401;
          return done(error);
        }
        // check for password and verify:true
        const verifyPassword = verifyHash(password, one.password);
        const verifyAccount = one.verified;
        console.log(verifyAccount, verifyPassword)
        if (!verifyPassword || !verifyAccount) {
          const error = new Error("Invalid Credentials");
          error.statusCode = 401;
          throw error;
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
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const { id, picture } = profile;
        console.log(profile);
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
          const error = new Error("Forbidden from JWT");
          error.statusCode = 403;
          return done(error);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;
