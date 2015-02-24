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



/////////////////////////////////////////////////
//////////// Book Shelf SetUp //////////////////
////////////////////////////////////////////////

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

//Book Save to Shelf

var $beingReadButton = $('#beingReadButton');

$beingReadButton.click(function(){
  beingRead(fb.getAuth().uid);
  $('#coverUrl').empty();
  $('#title').empty();
  $('#author').empty();
});

function beingRead(uid) {
  var bookDetailFb  = new Firebase(FIREBASE_URL + '/users/' + uid + '/booksBeingRead');
  var $img    = $('#coverUrl').val();
  var $title  = $('#title').val();
  var $author = $('#author').val();

  var bookObject = { coverImage: $img, bookTitle: $title, bookAuthor: $author }
  bookDetailFb.push(bookObject);
  return bookObject;
}

var $toReadButton = $('#toReadButton');

$toReadButton.click(function(){
  toRead(fb.getAuth().uid);
  $('#coverUrl').empty();
  $('#title').empty();
  $('#author').empty();
});

function toRead(uid) {
  var bookDetailFb  = new Firebase(FIREBASE_URL + '/users/' + uid + '/booksToRead');
  var $img    = $('#coverUrl').val();
  var $title  = $('#title').val();
  var $author = $('#author').val();

  var bookObject = { coverImage: $img, bookTitle: $title, bookAuthor: $author }
  bookDetailFb.push(bookObject);
  return bookObject;
}

var $toBuyButton = $('#toBuyButton');

$toBuyButton.click(function(){
  toBuy(fb.getAuth().uid);
  $('#coverUrl').empty();
  $('#title').empty();
  $('#author').empty();
});

function beingRead(uid) {
  var bookDetailFb  = new Firebase(FIREBASE_URL + '/users/' + uid + '/booksToBuy');
  var $img    = $('#coverUrl').val();
  var $title  = $('#title').val();
  var $author = $('#author').val();

  var bookObject = { coverImage: $img, bookTitle: $title, bookAuthor: $author }
  bookDetailFb.push(bookObject);
  return bookObject;
}









