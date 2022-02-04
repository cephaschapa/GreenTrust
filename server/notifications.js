module.exports = mailHanler = (email, names) => {
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
      subject: 'GreenTrust Credential Status',
      html: `<div>
              <h1>GreenTrust</h1>
              <p>Hi, ${names}</p>
              <p>Congratulations your credential was successfully issued.</p>
              <p>Regards</p>
              <p>The Avengers 🐈</p>
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
  