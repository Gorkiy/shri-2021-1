const request = require('request');

request
  .get(
    'http://localhost:8080/merge?front=2b2178f65375d238013e408a68e576c9&back=7c96b410a4ba1b00941f99ad1ba03f1f&color=182,215,248&threshold=10',
    console.log
  );
