const express = require('express');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Registration = mongoose.model('Registration');
const path = require('path');
const auth = require('http-auth');
const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});

module.exports = router;
router.get('/', (req, res) => {
  res.render('form', { title: 'Giris Formu!'});
  
});

router.post('/', [
  check('name')
    .isLength({min: 1 })
    .withMessage('Lütfen bir isim giriniz!'),
  check('email')
    .isLength({min: 5 })
    .withMessage('Email addressi gecersizdir!'),
    check('email')
    .isEmail()
    .withMessage('Email addressi girmediniz!')
] ,
(req, res) => {
  const errors = validationResult(req);
  console.log(req.body);

  if (errors.isEmpty()){
    const registration = new Registration(req.body);
    registration.save()
      .then(() => { res.send('Kayit icin Tesekkürtler!'); })
      .catch((err) => {
        console.log(err);
        res.send('Sanirim birseyler ters gitti!');
      });
  } else {
    res.render('form', {
      title: 'Giris Formu!',
      errors: errors.array(),
      data: req.body,
      });
    }
});

router.get('/registrations', basic.check((req, res) =>{
  Registration.find()
  .then((registrations) => {
    res.render('index', { title: 'Kayitli Üyeler Listesi', registrations});
  })
  .catch(() => { res.send('Üzgünüm bir sorun olustu!'); });
}));