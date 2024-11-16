const mongoose = require('mongoose');

const personSchema = new mongoose.Schema ({
  name:{
    type:String,
    required:true
  },
  age:{
    type:Number,
    required:true
  },
  work:{
    type:String,
    required:true,
    enum:['chef' , 'manager' , 'waiter']
  },
  mobile:{
    type:String,
    require:true
  },
  gmail:{
    type:String,
    required:true,
    unique:true
  },
  address:{
    type:String,
    required:true
  },
  salary:{
    type:Number,
    default:20000
  },
  username:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  createAt:{
  type:Date,
  default:Date.now()
  }, 
  updateAt:{
    type:Date,
    default:Date.now()
  }
});

module.exports = mongoose.model('Person' , personSchema);
