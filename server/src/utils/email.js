import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: 587,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const sendEmail = (email, pin) => {
  try {
    transporter.sendMail({
      from: '"CRM Company" <elmira.pagac@ethereal.email>', // sender address
      to: email, // list of receivers
      subject: "Password Reset Pin", // Subject line
      text:
        "Here is your password reset pin " +
        pin +
        "\nThis pin will expire in a day.", // plain text body
      html: `<b>Hello world?</b>
            Here is your pin
            <b>${pin}</b>
            This pin will expire in a day
            <p></p>`, // html body
    });

    // console.log("Message sent: %s", info.messageId);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.log(err);
  }
};
