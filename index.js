// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api", function (req, res) {
  return res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

app.get("/api/:date", function (req, res) {
  let date = req.params.date;
  if (!date) {
    return res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString(),
    });
  }

  if (!isNaN(Number(date))) {
    date = Number(date);
  }
  if (new Date(date) == "Invalid Date") {
    return res.json({
      error: "Invalid Date",
    });
  }

  return res.json({
    unix: new Date(date).getTime(),
    utc: new Date(date).toUTCString(),
  });
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
