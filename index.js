const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const port = 8000;

var app = express();

// create application/json parser
var jsonParser = bodyParser.json();

// DataBase (Associative array - Key: login, Val: password)
var passwords = {};
var LoginAdmin = 'admin@site.com';
var AdminPass = 'admin';
passwords[LoginAdmin] = AdminPass;

// Validation Email function
function validationEmail(mail) {
  if(mail.length != 0 && /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i.test(mail)){
    return true;
  }
  else
  {
    return false;
  }
}

// Validation Pass function
function validationPass(pass){
  if(pass.length != 0 && /^\S*$/i.test(pass)){
    return true;
  }
  else
  {
    return false;
  }
}

app.use(express.static(__dirname + '/Frontend'));

app.post("/login", jsonParser, function (req, res){
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    // Validation Email and Password
    if(validationEmail(req.body.inputEmailIn) &&
      validationPass(req.body.inputPassIn))
    {

      if (req.body.inputEmailIn in passwords &&
        passwords[req.body.inputEmailIn] == req.body.inputPassIn){
        res.json({
          status: 'AuthorizationSuccess'
        });
      }
      else {
        res.json({
          status: 'AuthorizationError'
        });
      }
    }
    else {
      res.json({
        status: 'AuthorizationError'
      });
    }
});

app.post("/signup", jsonParser, function (req, res){
    if(!req.body) return res.sendStatus(400);

    // Validation Email and Password
    if(validationEmail(req.body.inputEmailUp) &&
      validationPass(req.body.inputPassUp)) {

      if (req.body.inputEmailUp in passwords){
        res.json({
          status: 'RegistrationErrorUserAlreadyExists'
        });
      }
      else {
        // Add an entry to the table
        passwords[req.body.inputEmailUp] = req.body.inputPassUp;
        res.json({
          status: 'RegistrationSuccess'
        });
      }
    }
    else {
      res.json({
        status: 'RegistrationError'
      });
    }
});

app.get("/main", function(req, res){
   var httpPage = '<h1>Authorization successful!</h1>';
   res.send(httpPage);
});

app.listen(8000);