// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


//solution
app.get("/api", (req, res) => {
  let unixDate = new Date().getTime();
  let utcDate = new Date().toUTCString();
  
  return res.json({ unix: unixDate, utc: utcDate });
})

app.get("/api/:date", (req, res) => {
  let date = req.params.date;

  if (!isNaN(Number(date))) {
    let unixDate = new Date(Number(date)).getTime();
    let utcDate = new Date(Number(date)).toUTCString();
    
    return res.json({ unix: unixDate, utc: utcDate });
  }

  let unixDate = new Date(date).getTime();

  if(isNaN(unixDate)) return res.json({ error: "Invalid Date" })

  let utcDate = new Date(Date.parse(date)).toUTCString();

  return res.json({ unix: unixDate, utc: utcDate });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
