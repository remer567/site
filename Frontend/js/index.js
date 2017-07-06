// Redirect to main page
function redirectMain(){
    $(location).attr('href', 'http://localhost:8000/main');
}

// Validation Email function
function validationEmail(mail){
  if(mail.length != 0 && /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i.test(mail)){
    return [true, ''];
  }
  else
  {
    return [false, 'E-mail is not correct!'];
  }
}

// Validation Pass function
function validationPass(pass){
  if(pass.length != 0 && /^\S*$/i.test(pass)){
    return [true, ''];
  }
  else
  {
    return [false, 'Password is not correct!'];
  }
}

$(document).ready(function(){
    $('#btnLogIn').click(function(){
      // Validation Email
      let resultValidationEmail = validationEmail($('#inputEmailIn').val());
      let statusValidationEmail = resultValidationEmail[0];
      let messageValidationEmail = resultValidationEmail[1];
      $('#messageEmailIn').text(messageValidationEmail);

      // Validation Password
      let resultValidationPass= validationPass($('#inputPassIn').val());
      let statusValidationPass = resultValidationPass[0];
      let messageValidationPass = resultValidationPass[1];
      $('#messagePassIn').text(messageValidationPass);

      $('#messageLogIn').text('');

      // Authorization
      if(statusValidationEmail && statusValidationPass){
        let inputEmailIn = $('#inputEmailIn').val();
        let inputPassIn = $('#inputPassIn').val();

        $.ajax({
          type: 'POST',
          url: '/login',
          data: JSON.stringify({inputEmailIn: inputEmailIn, inputPassIn: inputPassIn}),
          dataType: 'json',
          contentType: 'application/json',
          success: function (data){
            if (data.status == 'AuthorizationSuccess'){
              $('#messageLogIn').text('Authorization success!');

              // Redirect to main page
              redirectMain();
            }
            else if (data.status == 'AuthorizationError'){
              $('#messageLogIn').text('Error authorization!');
            }

          }
        });
      }
    });

    $('#btnSignUp').click(function(){
      // Validation Email
      let resultValidationEmail = validationEmail($('#inputEmailUp').val());
      let statusValidationEmail = resultValidationEmail[0];
      let messageValidationEmail = resultValidationEmail[1];
      $('#messageEmailUp').text(messageValidationEmail);

      // Validation Password
      let resultValidationPass= validationPass($('#inputPassUp').val());
      let statusValidationPass = resultValidationPass[0];
      let messageValidationPass = resultValidationPass[1];
      $('#messagePassUp').text(messageValidationPass);

      $('#messageSignUp').text('');

      // Registration
      if(statusValidationEmail && statusValidationPass){
        let inputEmailUp = $('#inputEmailUp').val();
        let inputPassUp = $('#inputPassUp').val();

        $.ajax({
          type: 'POST',
          url: '/signup',
          data: JSON.stringify({inputEmailUp: inputEmailUp, inputPassUp: inputPassUp}),
          dataType: 'json',
          contentType: 'application/json',
          success: function (data){
            if (data.status == 'RegistrationSuccess'){
              $('#messageSignUp').text('Registration success!');
            }
            else if (data.status == 'RegistrationError'){
              $('#messageSignUp').text('Error registration!');
            }
            else if (data.status == 'RegistrationErrorUserAlreadyExists'){
              $('#messageSignUp').text('Error registration: user already exists!');
            }
          },
        });
      }
    });
});