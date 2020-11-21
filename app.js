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

app.get("/", (req, res) => { });

app.post("/", async (req, res) => {
  let transporter = nodemailer.createTransport(config);
  let countEmail = 0;
  let countFile = fs.readdirSync(directoryPath)

  fs.readdirSync(directoryPath).forEach((file) => {
    let pathAttachment = `${directoryPath}/${file}`;
    let mailOptions = {
      to: req.body.to,
      subject: req.body.title,
      text: req.body.body,
      attachments: [
        {
          // path: "./file/a.pdf",
          path: pathAttachment
        },
      ],
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log('-----', err);
      } else {
        countEmail++
        console.log('+++++', info);
      }
    }
    );
  });

  await res.send(rs.SUCCESS(countEmail));

});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
