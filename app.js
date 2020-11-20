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

  let a = [];

  fs.readdirSync(directoryPath).forEach((file) => {
    a.push(file);
  });


  let mailOptions = {
    to: req.body.to,
    subject: req.body.title,
    text: req.body.body,
    attachments: [
      {
        path: "./file/a.pdf",
      },
      {
        path: "./file/b.pdf",
      },
      {
        path: "./file/c.pdf",
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.send(rs.FAILURE(error));
    } else {
      res.send(rs.SUCCESS(info.response));
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
