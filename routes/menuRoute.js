const express = require('express');
const router = express.Router();
const Menu = require('../models/menuModel');


// add item
router.post('/' ,async (req , res) =>{
  try{
    const data  = req.body;
    const newData = new Menu(data);
    const response = await newData.save();

    res.status(200).json(response);
    console.log("Data saved");

  }catch(err){
    console.log('Interal server error');
    res.status(500).json({err:'Internal server error'});
  }
});

// show item

router.get('/' , async(req , res)=>{
  try{
    const data = await Menu.find();
    res.status(200).json(data);
    console.log('data fetch');


  }catch(error){
    console.log('Interal server error');
    res.status(500).json({err:'Internal server error'}); 
  }
});

// update menu data
router.put('/:id' , async(req , res)=>{
  try{
    const menuId = req.params.id;
    const updateMenuData = req.body;
    const response = await Menu.findByIdAndUpdate(menuId , updateMenuData , {
      new:true,
      runValidators:true
    });

    if(!response){
      console.log('Menu not found');
      return res.status(404).json({err:'Menu not found'});
    }

    console.log('Menu data updated');
    res.status(200).json(response);

  }catch(error){
    console.log('Interal server error');
    res.status(500).json({err:'Internal server error'}); 
  }
});
 
// delete menu item
router.delete('/:id' , async(req , res)=>{
  try{
    const menuId = req.params.id;
    const response = await Menu.findByIdAndDelete(menuId);

    if(!response){
      return res.status(404).json({err:'Menu data not found'});
    };

    console.log('Menu data deleted successfully');
    res.status(200).json('Menu data deleted success');

  }catch(error){
    console.log(error);
    res.status(500).json({err:'Internal server error'}); 
  }
});

// parameters api route

router.get('/:tasteType' ,async (req , res)=>{
  try{
    const tasteType = req.params.tasteType;
    if(tasteType=='spicy' || tasteType=='sour' || tasteType=='sweet' || tasteType=='delicious'){
      const response = await Menu.find({taste:tasteType});
      return res.status(200).json(response);
    }else{
      return res.status(404).json('Invalid taste type');
    }

  }catch(err){
    console.error('Interal server error' , err);
    res.status(500).json({err:'Internal server error'}); 
  }
});

module.exports = router;