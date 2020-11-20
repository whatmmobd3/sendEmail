const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const port = 3000;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const rs = require("./return");
const config = require("./config");

const nodemailer = require("nodemailer");

app.post("/", (req, res) => {
  let transporter = nodemailer.createTransport(config);

  let mailOptions = {
    from: req.body.form,
    to: "ddnn2026@gmail.com",
    subject: req.body.title,
    text: req.body.body,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send(rs.FAILURE(error));
    } else {
      console.log("Email sent: " + info.response);
       res.send(rs.SUCCESS(info));
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
