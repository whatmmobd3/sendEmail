const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const port = 3000;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const rs = require("./return");
const config = require("./config");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  res.send(rs.FAILURE(req.body.title));

  var transporter = nodemailer.createTransport(config.gmail);

  var mailOptions = {
    from: "whatmmobd3@gmail.com",
    to: "ddnn2026@gmail.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
