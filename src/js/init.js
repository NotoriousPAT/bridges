'use strict';

var bulk = require('bulk-require');
var router = require('./router');

// Require all of our controllers
bulk(__dirname, ['controllers/**/*.js']);
// took out /** from above. after controllers

// Start the router
router.init();
