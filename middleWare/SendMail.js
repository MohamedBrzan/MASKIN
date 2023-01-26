const nodemailer = require('nodemailer');

// Send Email
const sendEmail = (to, url) => {
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

  const mailOptions = {
    from: 'mohamedbrzan11@gmail.com',
    to: to,
    subject: 'Sending Email To User',
    html: `<div className='text-center my-5'>
    <div className='d-flex justify-content-center align-items-center'>
    <h3 className='mx-1'>Hello,</h3>
      <h3>
        <b>${to}</b>
      </h3>
    </div>
    <p>Please Follow Link Below To Reset Your Password</p>
    <a href=${url} className='btn btn-warning'>
      <b>Reset You Password</b>
    </a>
  </div>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return err;
    return info;
  });
};

module.exports = sendEmail;
