const express = require('express');
const Database = require("./Database");
const { PORT, dbDumpFile } = require('./config');
const db = new Database(dbDumpFile);
const fs = require('fs');
const multer = require('multer');
const uploads = multer({ dest: 'uploads/' });
const { replaceBackground } = require('backrem');
const path = require('path');

const app = express();

const upload = async (req, res) => {
  if (!req.file) {
    res.statusCode = 400;
    res.end('Invalid request');
  }
  db.add(req.file);
  res.end(req.file.filename);
}

const list = async (req, res) => {
  res.end(JSON.stringify(db.all()));
}

const getImage = async (req, res) => {
  res.end(JSON.stringify(db.get(req.params.id)));
}

const deleteImage = async (req, res) => {
  res.end(JSON.stringify(db.del(req.params.id)));
}

const merge = async (req, res) => {
  if (!req.query.front || !req.query.back) {
    res.statusCode = 400;
    res.end('No required params');
  }
  let front = db.get(req.query.front);
  let back = db.get(req.query.back);
  if (!front || !back) {
    res.statusCode = 404;
    res.end('Images not found');
  }

  if (req.query.color) {
    if (!req.query.color.match(/\d{1,3},\d{1,3},\d{1,3}/g)) {
      delete req.query.color;
    }
  }

  if (req.query.threshold !== undefined) {
    req.query.threshold = parseInt(req.query.threshold, 10);
  }

  replaceBackground(
    fs.createReadStream(path.resolve(__dirname, '../', front.path)),
    fs.createReadStream(path.resolve(__dirname, '../', back.path)),
    JSON.parse('[' + req.query.color + ']'),
    req.query.threshold
  )
    .then(
      (readableStream) => {
        //readableStream.pipe(fs.createWriteStream('/var/www/svdom/test.jpg'));
        readableStream.on('end', () => {
          res.end();
        });
        readableStream.pipe(res);
      }
    )
    .catch((err) => {
      res.statusCode = 500;
      res.end('ERROR');
    });
}

app.post('/upload', uploads.single('file'), upload);
app.get('/list', list);
app.get('/image/:id', getImage);
app.delete('/image/:id', deleteImage);
app.get('/merge', merge);


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
