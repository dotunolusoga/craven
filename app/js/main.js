'use strict';

function hello() {
  return 'world';
}
////////////////////////
// Selector variables //
////////////////////////

var $tbody = $('#tbody'),
    FIREBASE_URL = 'https://craven.firebaseio.com',
    fb           = new Firebase(FIREBASE_URL);



////////////////////////////////
// Login/Logout Functionality //
////////////////////////////////


  $('.register').click(function(event){
    event.preventDefault();
    var $form = $($(this).closest('form')),
        email = $form.find('[type="text"]').val(),
        pass = $form.find('[type="password"]').val();
    fb.createUser({
        email: email,
        password: pass
      },
      function(err){
        if(!err){
              fb.authWithPassword({
                email: email,
                password: pass
              },
                function(err, auth){
                    location.reload(true);
              }
            );
        } else {}
      }
    );

  });

  $('.loginButton').click(function(event){
    event.preventDefault();

    var $form = $($(this).closest('form')),
        email = $form.find('[type="text"]').val(),
        pass = $form.find('[type="password"]').val();

    fb.authWithPassword({
      email    : email,
      password : pass
      }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        location.reload(true);
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  });
