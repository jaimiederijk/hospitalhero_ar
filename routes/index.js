var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HospitalHero' });
});
router.get('/whack', function(req, res, next) {
  res.render('whackamole', { title: 'HospitalHero' });
});
router.get('/dance', function(req, res, next) {
  res.render('dance', { title: 'HospitalHero' });
});

module.exports = router;
