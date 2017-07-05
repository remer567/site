const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const port = 8000;

var app = express();
var jsonParser = bodyParser.json();

// DataBase (Associative array - Key: login, Val: password)
var passwords = {};
var LoginAdmin = 'admin@site.com';
var AdminPass = 'admin';
passwords[LoginAdmin] = AdminPass;

// Validation Email function
function validationEmail(mail) {
  var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i;

  if(mail != ''){
    if(mail.search(pattern) == 0){
      return true;
    }
    else{
      return false;
    }
  }
  else{
    return false;
  }
}

// Validation Pass function
function validationPass(pass){
  if(pass != ''){
    if(pass.indexOf(" ") == -1){
      return true;
    }
    else{
      return false;
    }
  }
  else{
    return false;
  }
}

app.use(express.static(__dirname + '/Frontend'));

app.post("/login", jsonParser, function (request, response){
    if(!request.body) return response.sendStatus(400);

    // Validation Email and Password
    if(validationEmail(request.body.inputEmailIn) &&
      validationPass(request.body.inputPassIn))
    {

      if (request.body.inputEmailIn in passwords &&
        passwords[request.body.inputEmailIn] == request.body.inputPassIn){
        response.json({
          status: 'AuthorizationSuccess'
        });
      }
      else {
        response.json({
          status: 'AuthorizationError'
        });
      }
    }
    else {
      response.json({
        status: 'AuthorizationError'
      });
    }


});

app.post("/signup", jsonParser, function (request, response){
    if(!request.body) return response.sendStatus(400);

    // Validation Email and Password
    if(validationEmail(request.body.inputEmailUp) &&
      validationPass(request.body.inputPassUp)) {

      if (request.body.inputEmailUp in passwords){
        response.json({
          status: 'RegistrationErrorUserAlreadyExists'
        });
      }
      else {
        // Add an entry to the table
        passwords[request.body.inputEmailUp] = request.body.inputPassUp;
        response.json({
          status: 'RegistrationSuccess'
        });
      }
    }
    else {
      response.json({
        status: 'RegistrationError'
      });
    }
});

app.get("/main", function(request, response){
   var httpPage = '<h1>Authorization successful!</h1>';
   response.send(httpPage);
});

app.listen(8000);