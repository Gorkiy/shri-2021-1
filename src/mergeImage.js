const request = require('request');

request
  .get(
    'http://localhost:8080/merge?front=08bd67f90d273bceab56e40a2714f528&back=d55ecad3a613be6b6157042aa2747ea7&color=182,215,248&threshold=10',
    console.log
  );
