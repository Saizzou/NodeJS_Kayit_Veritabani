const express = require('express');
const path = require('path');
const routes = require('./routes/index');


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.urlencoded({extended: true})); // Eski tip Express (<=3) kullananlar buraya bodyParse kullanmali!
app.use(express.json()) 
app.use('/', routes); // Sakin bunu basa atamayin Parser isleminden önce olursa Parser dönümü bosa cikar!
app.use(express.static('public'));

module.exports = app;