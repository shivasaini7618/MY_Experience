const express = require('express');
const router = express.Router();
const Person = require('../models/personModel');

// register route
router.post('/ragister' , async(req , res)=>{
  try{
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    
    res.status(200).json(response);
    console.log('Data saved');

  }catch(err){
    console.log(err);
    res.status(500).json({msg:'Internal server error'});
  }
});


// login route 

router.post('/login' , async(req , res)=>{
  try{
    const {username , password} = req.body;
    const user = await Person.findOne({username:username , password:password});

    if(!user){
      console.log('Incorrect username or password');
       return res.status(401).json({err:'Invalid username or password'})
      } 
    res.status(200).json(user);
    console.log('User login');

  }catch(err){
    console.log(err);
    res.status(500).json({msg:'Internal server error'});
  }
});


// fetch all data
router.get('/' ,async (req , res)=>{
  try{

    const user = await Person.find();

    res.status(200).json(user);
    console.log('Data fetch');

  }catch(err){
    console.log(err);
    res.status(500).json({msg:'Internal server error'});
  }
})

// update route

router.put('/update/:id' , async(req , res)=>{
  try{

    const userId = req.params.id;
    const updateUser = req.body;
    const response = await Person.findByIdAndUpdate(userId , updateUser , {
      new:true,
      runValidators:true
    });

    if(!response){
      console.log("Person not found")
      return res.status(404).json({err:'Person not found'});
    }

    console.log('Data update');
    res.status(200).json(response);

  }catch(err){
    console.log(err);
    res.status(500).json({err:'Internal server error'});
  }
});

// delete person

router.delete('/delete/:id' , async(req , res)=>{
  
 try{
  const personId = req.params.id;
  const deletePerson = await Person.findByIdAndDelete(personId);

  if(!personId){
    return res.status(404).json({err:"person not found"})
  }
  console.log('Data deleted');
  res.status(200).json('Delete successfull');

 }catch(err){
  console.log(err);
  res.status(500).json({err:'Internal server error'});
 }
});

// parameters api

router.get('/:workType' , async(req , res)=>{
  try{
    const workType = req.params.workType;
    if(workType=='chef' || workType=='waiter' || workType =='manager'){
      const response = await Person.find({work:workType});
      return res.status(200).json(response);
    } else{
      res.status(404).json({err:'Invalid work type'});
    }

  }catch(err){
  console.log(err);
  res.status(500).json({err:'Internal server error'});
 }
});


module.exports = router;

