const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fakeflexfantasywebsite@gmail.com",
    pass: "vnvjeczytllbdzvj",
  },
});

exports.sendNoti=functions.database.ref("/articles").onCreate( async (snapshot)=>{
  // get the data that was just added to the Realtime Database
  const val = snapshot.val();

  // define the email options
  const mailOptions = {
    from: "fakeflexfantasywebsite@gmail.com",
    to: "richardtillo@gmail.com",
    subject: "Article submitted for review",
    text: `Article submitted for review: ${JSON.stringify(val)}`,
  };

  // send the email
  try {
    await transporter.sendMail(mailOptions);
    functions.logger.log(
        "Email sent",
    );
  } catch (error) {
    functions.logger.error(
        "There was an error while sending the email:",
        error,
    );
  }
  return null;
});
