const mongoose = require('mongoose');
const { type } = require('os');
const { boolean } = require('webidl-conversions');

const menuSchema = new mongoose.Schema({
  dish:{
    type:String,
    require:true
  },
  price:{
    type:Number
  },
  taste:{
    type:String,
    enum:['sweet' , 'sour' , 'spicy' , 'delicious']
  },
  is_Drink:{
    type:Boolean,
    default:false
  },
  sales:{
    type:Number,
    default:1
  }
});

module.exports = mongoose.model('Menu' , menuSchema);