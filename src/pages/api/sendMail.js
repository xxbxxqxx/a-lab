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

  const emailToAddress = req.body.emailTo ? req.body.emailTo : "ryo.estrella@gmail.com, contract@activatelab.co.jp"

  const mailData = {
    from: "OpenGate Careers（オープンゲートキャリアズ） <no-reply@opengate.careers>",
    to: emailToAddress,
    //subject: `Message From ${req.body.name}`,
    subject: `${req.body.emailSubject}`,
    //text: req.body.message + " | Sent from: " + req.body.email,
    html: `<p>${req.body.emailBody}</p>`,
  }
  
  if(req.body.attachmentFile){
    mailData.attachments  = [
      {   // utf-8 string as an attachment
        //filename: 'text1.txt',
        path: req.body.attachmentFile
      }
    ]
  }
  transporter.sendMail(mailData, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info)
  })

  res.statusCode = 200;
}