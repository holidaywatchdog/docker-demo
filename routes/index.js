const express = require('express');
const Memcached = require('memcached');
const router = express.Router();
const _ = require('lodash');

let memcached = new Memcached(process.env.MEMCACHED_HOST);
let title = process.env.PAGE_TITLE || 'Welcome to this homepage';

const MC_COUNTER = 'counter';


//Set default value;
memcached.get(MC_COUNTER, function (err, counter) {

  if(_.isUndefined(counter)){

    memcached.set(MC_COUNTER, 0, 5000, function (err) {
      console.log('SETTING STARTING VALUE');
    });

  }

});

router.get('/', function(req, res, next) {

  memcached.get(MC_COUNTER, function (err, counter) {

    console.log('Memcached counter ' + counter, err);

    res.render('index', {
      title: title,
      counter: (counter ? counter++: 0)
    });

    memcached.incr(MC_COUNTER, 1, function (err) {
      console.log('Incremented counter');
    });

  });

});

module.exports = router;
