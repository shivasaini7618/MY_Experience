const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./config/db');
const bodyParsr = require('body-parser');
const personRoute = require('./routes/personRoute');
const menuRoute = require('./routes/menuRoute');
app.use(bodyParsr.json());
const PORT = process.env.PORT || 4000

app.get('/' , (req , res)=>{
  res.send('Welcome to my server');
});

app.use('/person' , personRoute);
app.use('/menu' , menuRoute);

app.listen(PORT , ()=>{
  console.log(`Server started at port no ${PORT}`);
});