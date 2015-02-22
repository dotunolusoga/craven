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
        alert("Login Failed! Please check your username & password");
      } else {
        location.reload(true);
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  });

  //if authenticated, go to app page

  fb.child('users').once('value', function(snap){
    if (fb.getAuth()) {
      $('.login').toggleClass('hidden');
      $('.statusContainer').toggleClass('hidden');
    }
  });

  $('.addToShelf').click(function(evt) {
    evt.preventDefault();
    $('.statusContainer').toggleClass('hidden');
    $('.addBookProfile').toggleClass('hidden');
  });


//Cover Art Addition

var $coverArtContainer = $('.appendedCoverArt');
var $submitCoverImage  = $('#coverImage');
var $bookCover         = $('.bookCover');

$submitCoverImage.click(function() {
  $bookCover.toggleClass('hidden');
 var $pic = $('#coverUrl').val();
 var $img = $('<img src='+$pic+'></img>');

  $coverArtContainer.append($img);
});

//Cover Art Reset

 var $coverReset = $('#reset');

  $coverReset.click(function(evt) {
    location.reload(true);
  });
