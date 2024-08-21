// async recoveryCode(req, res, next) {
//     try {
//       const { email } = req.body;
//       const user = await usersRepository.readByEmailRepository(email);
//       if (!user) {
//         return res.err404user();
//       }
//       const recoveryCode = crypto.randomBytes(12).toString("hex");
//       await sendRecoveryEmail({
//         to: email,
//         code: recoveryCode,
//       });
//       const data = {
//         email: email,
//         code: recoveryCode,
//       };
//       const recoveryToken = createRecoveryToken(data);
//       return res
//         .cookie("recoveryToken", recoveryToken, { signedCookie: true })
//         .suc200mes("Recovery code sent. Please check your email.");
//     } catch (err) {
//       return next(err);
//     }
//   }
//   async resetPassword(req, res, next) {
//     try {
//       const { code, password } = req.body;
//       const { recoveryToken } = req.cookies;
//       const data = verifyToken(recoveryToken);
//       const verified = code === data.code;
//       if (!verified) {
//         return res.err400invalidCode();
//       }
//       const user = await usersRepository.readByEmailRepository(data.email);
//       const uid = user._id;
//       const hashPassword = createHash(password);
//       const userWithUpdatedPassword = await usersRepository.updateRepository(
//         uid,
//         { password: hashPassword }
//       );
//       return res
//         .clearCookie("recoveryToken")
//         .suc200mes("Password updated successfully");
//     } catch (err) {
//       return next(err);
//     }
//   }