//const http = require('http');
const express = require('express');
//const { PORT } = require('./config');
const {apiRouter, mainRouter} = require('./routers');
const api = require("./controllers/api");
const svgExists = require("./validators/middlewares/svgExists");
//const setupMiddlewares = require('./middlewares');
//const upgradeWs = require('./ws');
const db = require("./Database");
const fs = require('fs');
const readline = require('readline');

const app = express();


const upload = async (req, res) => {
  let buffer = '';
  let boundary = '';

  //const stream = fs.createWriteStream('/var/www/svdom/request.txt');
  let beforeBoundary = true;
  let beforeHeadersEnd = true;
  let proceed = true;
  req.on('data', (chunk) => {
    console.warn('chunk arrived');
    if (proceed) {
      buffer += chunk;
    }

    let lines = buffer.split("\r\n");
    if (lines.length <2 ) {
      return;
    }
    buffer = lines.pop();
    for (let i = 0; i < lines.length; i++) {
      console.warn('line',line);
      let line = lines[i];
      if (beforeBoundary) {
        let parts = line.split("\r\n", 2);
        if (parts.length < 2) {
          continue;
        }
        const matches = parts[0].match(/^-{10,}.+$/g);
        if (!matches) {
          continue;
        }
        boundary = matches[0];
        beforeBoundary = false;
        continue;
      }

      if (beforeHeadersEnd) {
        console.warn(line);
        beforeHeadersEnd = false;
        proceed = false;
        return;
        let parts = buffer.split("\r\n", 2);
        if (parts.length < 2) {
          return;
        }
        buffer = parts[1];
        const headers = parts[0].split(': ',2);
        if (headers.length < 2) {
          return;
        }
        console.warn('Header',headers);
        return;

        beforeHeadersEnd = false;
        return;
      }


    }

  });


  req.on('end', () => {
    console.warn('request finished');
    buffer = '';
  });
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

}

app.post('/upload', upload);
app.get('/list', list);
app.get('/image/:id', getImage);
app.delete('/image/:id', deleteImage);
app.get('/merge', merge);


app.listen(3031, () => {
  console.log(`Server started on port 3030`);
});
