const Report = require("../models/Report");

const sendReport = (req, res, next) => {
  var spliceUrl;
  if (req.body.url.includes("?")) {
    spliceUrl = req.body.url.split("?");
  } else {
    spliceUrl = req.body.url.split("/");
  }

  if (spliceUrl[1].includes("fbid")) {
    console.log("URL: " + spliceUrl[1].split("&")[0]);
    spliceUrl = spliceUrl[1].split("&")[0];
  } else {
    console.log("URL: " + spliceUrl[0]);
  }

  let report = new Report({
    username: req.body.username,
    email: req.body.email,
    url: req.body.url,
  });
  report
    .save()
    .then(() => {
      res.json({
        message: "Report Added Sucessfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};

module.exports = {
  sendReport,
};
