require('dotenv').config();
const Registration = require('./models/Registration');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
   useNewUrlParser: true,
   useUnifiedTopology: true 
});

mongoose.connection
    .on('open', () => {
        console.log('Mongoose baglantisi olusturuldu!');
    })
    .on('error', (err) => {
        console.log(`Baglanti hatasi: ${err.message}`);
    });


const app = require('./app');
const server = app.listen(3000, () => {
    console.log(`Express ${server.address().port} Portu üstünde calisiyor!`);
});