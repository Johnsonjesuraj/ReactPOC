const mongoose = require('mongoose');

//require database URL from properties file

const dbURL = require('./properties').DB;

//export this funcion and import in index.js

module.exports = function(){
    mongoose.connect(dbURL, {useNewUrlParser: true});

    mongoose.connection.on('connected', ()=>{
        console.log("Mongoose is connected in", dbURL);
    });

    mongoose.connection.on('error', (err)=> {
        console.log("Mongoose ocured error", err);
    });
}