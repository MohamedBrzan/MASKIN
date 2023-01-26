const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
module.exports = function sendMail(url, to) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: '@gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'mohamedbrzan11@gmail.com',
      pass: 'afgoryrfpuzugoth',
    },
  });
  let mailOptions = {
    from: 'mohamedbrzan11@gmail.com',
    to: 'mohamedbrzan11@gmail.com',
    subject: 'mohamedbrzan11@gmail.com',
    html: '<h1>Hello Mohammed</h1>',
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    }
    return info;
  });
};


