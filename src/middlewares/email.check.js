import nodemailer from 'nodemailer';

export const sendMail = (to, subject, htmlContent) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'greensalecompany@gmail.com',
      pass: 'ckwdcwivevbtuwfh',
    },
  });
  var mailOptions = {
    from: 'greensalecompany@gmail.com',
    to: to,
    subject: subject,
    html: htmlContent,
  };
  return transporter.sendMail(mailOptions);
};
