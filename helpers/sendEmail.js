const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const HttpError = require("../helpers");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "andr380v@gmail.com" };
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw HttpError(400, "Error SendMail");
  }
};

module.exports = sendEmail;
