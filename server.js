const nodemailer = require("nodemailer");
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

let name, age, code, phoneNumber, email, yearsOfExperience, designation, path;

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
      subject = "Tranos Careers Page";
      name = req.body.name;
      age = req.body.age;
      code = req.body.code;
      phoneNumber = req.body.phoneNumber;
      email = req.body.email;
      yearsOfExperience = req.body.yearsOfExperience;
      designation = req.body.designation;
      path = req.file.path;

      // const transporter = nodemailer.createTransport({
      //   service: "gmail",
      //   host: "smtp.gmail.com",
      //   secure: false,
      //   auth: {
      //     user: "delzmiyaki@gmail.com",
      //     pass: "gwnqbqiyjwtmnces",
      //   },
      // });

      const transporter = nodemailer.createTransport({
        // service: "ahead-bydesign.com",
        host: "smtp.ahead-bydesign.com",
        port: 465,
        secure: true,
        auth: {
          user: "sunday@ahead-bydesign.com",
          pass: "BamiSunday1988"
        }
      })

      const mailOptions = {
        from: req.body.email,
        to: "sunday@ahead-bydesign.com",
        subject,
        text: `
        name: ${name}
        age: ${age}
        code ${code}
        phone number: ${phoneNumber}
        email: ${email}
        years of experience: ${yearsOfExperience}
        designation: ${designation}

        `,
        attachments: [
          {
            path,
          },
        ],
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.send("Error");
        } else {
          console.log("Email sent " + info.response);
          res.send("Success");
        }
      });
    }
  });
});

app.listen(PORT, () => console.log("App running on " + PORT));
