const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.mongoDB_URI
mongoose.connect(url);

const db = mongoose.connection;

db.on('connected' , ()=>{
  console.log('mongodb connection successfully');
});

db.on('error' , (error)=>{
  console.log('mongodb error : ' , error)
})

db.on('disconnected' , ()=>{
  console.log('Mongodb server disconnected')
});

module.exports = db;