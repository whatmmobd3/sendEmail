const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const port = 3000;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const rs = require("./return");
const config = require("./config");

const nodemailer = require("nodemailer");

const path = require("path");
const fs = require("fs");

const directoryPath = "./file";

app.get("/", (req, res) => {});


app.post("/", async (req, res) => {
  let transporter = nodemailer.createTransport(config);

  let a = []

  fs.readdirSync(directoryPath).forEach(file => {
    a.push(file)
  });

  console.log(a);

  let mailOptions = {
    to: "ddnn2026@gmail.com",
    subject: req.body.title,
    text: req.body.body,
    attachments: {
      path: "./file/twl.pdf",
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.send(rs.FAILURE(error));
    } else {
      res.send(rs.SUCCESS(aa));
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
