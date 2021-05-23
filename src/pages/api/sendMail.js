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
    attachments: [
      {   // utf-8 string as an attachment
        //filename: 'text1.txt',
        path: req.body.attachmentFile
        //path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXvrNkiWwenKVqjViAV8wG1dYn7SzpcAqH1g&usqp=CAU"
      }
    ],
    html: `<p>${req.body.emailBody}</p>`,
  }

  transporter.sendMail(mailData, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info)
  })

  res.statusCode = 200;
}