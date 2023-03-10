const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const emailToSend = { ...data, from: "lapchenko.ss@gmail.com" };
  try {
    await sgMail.send(emailToSend);
    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email.");
  }
};

module.exports = sendEmail;
