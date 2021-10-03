const { PORT } = require('./config');
const request = require('request');
const fs = require('fs');
const path = require('path');

var req = request.post(`http://localhost:${PORT}/upload`, function (err, resp, body) {
  if (err) {
    console.log('Error!', err);
  } else {
    console.log('URL: ' + body);
  }
});

const form = req.form();
form.append('file', fs.createReadStream(path.resolve(__dirname, 'assets/cat.jpg')));
