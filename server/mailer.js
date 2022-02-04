module.exports = mailHanler = (email, names, url) => {
  var nodemailer = require('nodemailer');
  var smtpTransport = require('nodemailer-smtp-transport');

  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    port:587,
    auth: {
      user: 'cephaschapa@gmail.com',
      pass: 'd@abase12'
    }
  }));

  var mailOptions = {
    from: 'cephaschapa@gmail.com',
    to: `${email}`,
    subject: 'GreenTrust Connection Invitation',
    html: `<div>
            <h1>GreenTrust</h1>
            <p>Hi, ${names}</p>
            <p>Scan the QR Code with your trinsic wallet to get connected.</p>
            <p>If you already have the wallet installed click on open in wallet.</p>
            <a style="color:blue" href=${url}>Connction Link</a>
            <p>Kind Regards</p>
            <p>The Strongest Avenger (Morgan)</p>
          </div>`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}