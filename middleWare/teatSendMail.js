const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const OAuth_PLAYGROUND = 'https://developers.google.com/oauthplayground/';

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  CLIENT_URL,
  //   MAILING_SERVICE_REFRESH_TOKEN,
  MAIL_ACCESS_TOKEN,
  SENDER_MAIL_ADDRESS,
} = process.env;

const MAILING_SERVICE_REFRESH_TOKEN =
  'ya29.a0AVA9y1vS4ShDCcve7452pzzGDp8uIC8AI1roGsJ9cFlAuQsq-RHV1lVL77GUi3X6L9qedAyf7D0FPWRLoLQH5kYhUQjYkEAXcMzTj3UortGGlZg_5kbdMz5mBMFb1aKPOEOoEXtzNHzzdIaPsWSVrcl5qdozaCgYKATASAQASFQE65dr8lTI3lz-eOZnwH7oI2Cxplw0163';

const auth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  OAuth_PLAYGROUND
);

// Send Email
const sendEmail = (to, url) => {
  auth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });

  const accessToken = auth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: SENDER_MAIL_ADDRESS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: SENDER_MAIL_ADDRESS,
    to: to,
    subject: 'Sending Email To User',
    html: `<h1>Hello ${to} How Are U Hope You Good </h1> <a href=${url}>This Your Link To Change Your Password</a>`,
  };

  smtpTransport.sendMail(mailOptions, (err, info) => {
    if (err) return err;
    return info;
  });
};

module.exports = sendEmail;
