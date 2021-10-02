const request = require('request');
//cat file 18b8d19264756b9c6357b95e7cb8eab0
//background file 7df5c9a51cb8962dfc38d066ae9aaa1c
//random f94b5ccdfcba07dadf2060e7dd5c6460
//[245,248,253]
//182,215,248


request
  .get(
    'http://localhost:3031/merge?front=f94b5ccdfcba07dadf2060e7dd5c6460&back=7df5c9a51cb8962dfc38d066ae9aaa1c&color=182,215,248&threshold=10',
    console.log
  );


//[245, 248, 253]
