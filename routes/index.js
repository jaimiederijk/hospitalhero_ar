var express = require('express');
var router = express.Router();
var connector  = require('../lib/connector');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HospitalHero' });
});
router.get('/game', function(req, res, next) {
  res.render('game', { title: 'HospitalHero' });
});
router.get('/:userId/game', function(req, res, next) {

  connector.dbactions.findUser(req.params.userId,(docs)=>{

    res.render('game',{
      title: 'HospitalHero',
      username:docs.username,
      userid: docs._id,
      character: docs.pick_a_character
    });
  })
});
router.get('/whack', function(req, res, next) {
  res.render('whackamole', { title: 'HospitalHero' });
});
router.get('/dance', function(req, res, next) {
  res.render('dance', { title: 'HospitalHero' });
});
router.get('/:userId/dance', function(req, res, next) {
  connector.dbactions.findUser(req.params.userId,(docs)=>{

    res.render('dance',{
      title: 'HospitalHero',
      username:docs.username,
      userid: docs._id,
      character: docs.pick_a_character
    });
  })

});

module.exports = router;
