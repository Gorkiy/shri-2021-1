const request = require('request');
const fs = require('fs');


var req = request.post('http://localhost:3031/upload', function (err, resp, body) {
  if (err) {
    console.log('Error!', err);
  } else {
    console.log('URL: ' + body);
  }
});
var form = req.form();
form.append('file', fs.createReadStream('/var/www/svdom/upload.jpeg'));


//[245, 248, 253]
