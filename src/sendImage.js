const { PORT } = require('./config');
const request = require('request');
const fs = require('fs');
const path = require('path');

var req = request.post(`http://localhost:${PORT}/upload`, function (err, res, body) {
  console.log('err: ', err);
  if (err) {
    console.log('Error!', err);
  } else {
    console.log('URL: ' + body);
  }
});

const form = req.form();
form.append('image', fs.createReadStream(path.resolve(__dirname, 'assets/cat.jpg')));
