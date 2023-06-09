import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import * as dotenv from "dotenv"
dotenv.config({ path: "./vars/.env" })

// https://ethereal.email/create
let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD_EMAIL, // generated ethereal password
    },
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: "https://mailgen.js/"
    }
})
transporter.verify(function (error, success) {
    if (error) {
      console.log('error TEST', error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;
    console.log(username, userEmail)
    var email = {
        body: {
            name: username,
            intro : text || 'Welcome to Daily Tuition! We\'re very excited to have you on board.',
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }

    var emailBody = MailGenerator.generate(email)

    let message = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: subject || "Signup Successful",
        html: emailBody
    }

    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: 'You should receive an email from us.' })
        })
        .catch(error => {console.log(error), res.status(500).send({ error })})
}

export default registerMail;