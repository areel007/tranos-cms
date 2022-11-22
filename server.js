const nodemailer = require("nodemailer");
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let email, subject, message, phone, path;

let Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./images");
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

let upload = multer({
  storage: Storage,
}).single("image");

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.end("Something went wrong");
    } else {
      email = req.body.email;
      subject = req.body.subject;
      message = req.body.message;
      phone = req.body.phone;
      path = req.file.path;

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
        subject,
        text:
        `
        message: ${req.body.message}
        phone: ${req.body.phone}
        email: ${req.body.email}
        `,
        attachments: [
          {
            path
          }
        ]
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

    }
  });

});

app.listen(PORT, () => console.log("App running on " + PORT));
