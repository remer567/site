// Redirect to main page
function redirectMain() {
    $(location).attr('href', 'http://localhost:8000/main');
}

// Validation Email function
function validationEmail(mail) {
  var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i;

  if(mail != ''){
    if(mail.search(pattern) == 0){
      return [true, ''];
    }
    else{
      return [false, "E-mail is not correct!"];
    }
  }
  else{
    return [false, "E-mail can not be empty!"];
  }
}

// Validation Pass function
function validationPass(pass){
  if(pass != ''){
    if(pass.indexOf(" ") == -1){
      return [true, ''];
    }
    else{
      return [false, "Password is not correct!"];
    }
  }
  else{
    return [false, "Password can not be empty!"];
  }
}

$(document).ready(function(){
    $("#btnLogIn").click(function(){

      // Validation Email
      var resultValidationEmail = validationEmail($("#inputEmailIn").val());
      var statusValidationEmail = resultValidationEmail[0];
      var messageValidationEmail = resultValidationEmail[1];
      $("#messageEmailIn").text(messageValidationEmail);

      // Validation Password
      var resultValidationPass= validationPass($("#inputPassIn").val());
      var statusValidationPass = resultValidationPass[0];
      var messageValidationPass = resultValidationPass[1];
      $("#messagePassIn").text(messageValidationPass);

      $("#messageLogIn").text("");

      // Authorization
      if(statusValidationEmail && statusValidationPass){
        var inputEmailIn = $("#inputEmailIn").val();
        var inputPassIn = $("#inputPassIn").val();

        $.ajax({
          type: "POST",
          url: "/login",
          data: JSON.stringify({inputEmailIn: inputEmailIn, inputPassIn: inputPassIn}),
          dataType: "json",
          contentType: "application/json",
          success: function (data){
            if (data.status == 'AuthorizationSuccess'){
              $("#messageLogIn").text("Authorization success!");

              // Redirect to main page
              redirectMain();
            }
            else if (data.status == 'AuthorizationError'){
              $("#messageLogIn").text("Error authorization!");
            }

          }
        });
      }
    });


    $("#btnSignUp").click(function(){

      // Validation Email
      var resultValidationEmail = validationEmail($("#inputEmailUp").val());
      var statusValidationEmail = resultValidationEmail[0];
      var messageValidationEmail = resultValidationEmail[1];
      $("#messageEmailUp").text(messageValidationEmail);

      // Validation Password
      var resultValidationPass= validationPass($("#inputPassUp").val());
      var statusValidationPass = resultValidationPass[0];
      var messageValidationPass = resultValidationPass[1];
      $("#messagePassUp").text(messageValidationPass);

      $("#messageSignUp").text("");

      // Registration
      if(statusValidationEmail && statusValidationPass){
        var inputEmailUp = $("#inputEmailUp").val();
        var inputPassUp = $("#inputPassUp").val();

        $.ajax({
          type: "POST",
          url: "/signup",
          data: JSON.stringify({inputEmailUp: inputEmailUp, inputPassUp: inputPassUp}),
          dataType: "json",
          contentType: "application/json",
          success: function (data){
            if (data.status == 'RegistrationSuccess'){
              $("#messageSignUp").text("Registration success!");
            }
            else if (data.status == 'RegistrationError'){
              $("#messageSignUp").text("Error registration!");
            }
            else if (data.status == 'RegistrationErrorUserAlreadyExists'){
              $("#messageSignUp").text("Error registration: user already exists!");
            }
          },
        });
      }


    });

});