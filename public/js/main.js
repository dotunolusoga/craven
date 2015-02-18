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
