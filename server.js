const nodemailer = require('nodemailer')
const express = require('express')

const app = express()

const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.post('/', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
      user: 'delzmiyaki@gmail.com',
      pass: 'gwnqbqiyjwtmnces',
    }
  })

  const mailOptions = {
    from: req.body.email,
    to: 'delzmiyaki@gmail.com',
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: {
      message: `${req.body.message}`,
      phone: `${req.body.phone}`
    }
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Error')
    } else {
      console.log('Email sent ' + info.response);
      res.send('Success')
    }
  })
})

app.listen(PORT, () => console.log('App running on ' + PORT))