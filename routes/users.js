var express = require('express');
var router = express.Router();

var connector  = require('../lib/connector');

/* GET users listing. */
router.get('/', (req, res, next)=> {
  res.render('users', { title: 'HospitalHero' });
});
router.post('/',(req, res, next)=> {

  console.log(req.body);

  connector.dbactions.createUser(req.body, (docs)=>{
    console.log(docs);
    res.redirect('users/'+ docs._id + '/charactercreator')

  })
});


router.get('/:userId/charactercreator',(req, res, next)=> {
  console.log(req.params.userId);
  connector.dbactions.findUser(req.params.userId,(docs)=>{

    res.render('charactercreator',{
      title: 'HospitalHero',
      username:docs.username,
      userid: docs._id
    });
  })
})
router.post('/:userId/charactercreator',(req, res, next)=> {

  console.log(req.body);
  console.log(req.params.userId);

  connector.dbactions.updateUser(req.params.userId,req.body, (docs)=>{
    console.log("fun");
    console.log(docs);

    res.redirect('character')

  })
});

router.get('/:userId/character',(req, res, next)=> {
  console.log(req.params.userId);
  connector.dbactions.findUser(req.params.userId,(docs)=>{

    res.render('character',{
      title: 'HospitalHero',
      username:docs.username,
      userid: docs._id,
      character: docs.pick_a_character
    });
  })
})
router.get('/login',(req, res, next)=> {

  connector.dbactions.find({},(docs)=>{
    console.log(docs);
    res.render('login',{
      title: 'HospitalHero',
      users:docs,
    });
  })
})

module.exports = router;
