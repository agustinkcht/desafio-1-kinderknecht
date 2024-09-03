import { createTransport } from "nodemailer";
import __dirname from "../../utils.js";
import environment from "./env.util.js";

const { GOOGLE_EMAIL, GOOGLE_PASSWORD } = environment;

async function sendVerificationEmail(data) {
  // receives to, name and code.
  try {
    // TRANSPORT with all the data needed for sending email
    // works with verify() and sendMail()
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: GOOGLE_EMAIL, pass: GOOGLE_PASSWORD },
    });
    await transport.verify(); // if !credentials, then catch
    await transport.sendMail({
      // using the transport, i send the email.
      // the object inside uses data passed as argument when the function is called.
      from: GOOGLE_EMAIL,
      to: data.to,
      subject: `TechNode Registration Team - ${GOOGLE_EMAIL}`,
      html: `
            <h1 style="color: blue"> Welcome to Technode, ${data.name.toUpperCase()} </h1>
            <span> To complete your account setup, please enter the following verification code.</span>
            <h2> ${data.code} </h2>
        `,
    });
  } catch (err) {
    throw err;
    // simplemente lo arrojo para q lo catchee el error handler en caso de que falle.
  }
}

async function sendRecoveryEmail(data) {
  try {
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: GOOGLE_EMAIL, pass: GOOGLE_PASSWORD },
    }); // brought from environment util
    await transport.verify();
    await transport.sendMail({
      from: GOOGLE_EMAIL,
      to: data.to,
      subject: `Technode Password Recovery - ${GOOGLE_EMAIL}`,
      html: `
            <h1 style="color: blue"> Hey ${data.to}, here's your password reset code: </h1>
            <h2> ${data.code} </h2>
            <span> Please enter this code on the recovery page. Keep it private and don't share it with anyone. Remember, no one from TechNode will ever ask for this code. </span>
        `,
    });
  } catch (err) {
    throw err;
  }
}

export { sendVerificationEmail, sendRecoveryEmail };