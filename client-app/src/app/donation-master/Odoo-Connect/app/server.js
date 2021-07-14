var express = require("express");
var app = express();
var multer  = require('multer');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var odooApi = require("./controller/odooApi");
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    
      // Pass to next layer of middleware
   next();
});


/*** Admin controller *******/
app.post("/get_all_donar_list", odooApi.getDatas);

app.post("/create_donar", odooApi.createData);

app.get('/', function (req, res) {
	  res.send('Hello.......!');
});

app.listen(3001);
console.log("Localhost:3001");















