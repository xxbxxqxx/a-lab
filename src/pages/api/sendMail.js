export default async (req, res) => {
  let nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({
    port: 465,
    host: process.env.AWS_R_SMTP_HOST,
    auth: {
      user: process.env.AWS_R_SMTP_USER,
      pass: process.env.AWS_R_SMTP_PASS,
    },
    secure: true,
  })

  const mailData = {
    from: "test@test-xxbxxqxx.com",
    to: "ryo.estrella@gmail.com",
    //subject: `Message From ${req.body.name}`,
    subject: "Message",
    //text: req.body.message + " | Sent from: " + req.body.email,
    text: "aaaa",
    html: "<div>avv</div><p>Sent from:</p>"
  }

  transporter.sendMail(mailData, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info)
  })

  res.statusCode = 200;
  res.json({ msg: 'meiii' });
}