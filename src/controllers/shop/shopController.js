const express = require("express");
const shopController = express.Router();
const {Shops} = require("../../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../../../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");





//to get details of shop that ha ogged in now
shopController.get("/shop/thisShop", validateToken (req, res,next) => {

  try {
    res.status(200).json(req.user);  
  } catch (error) {
  next(error);
  }
    
  });
// to register shop
shopController.post("/shop/register",validateToken,async (req, res,next) => {
  try {

      const { shopName,phoneNumber,email,location,password } = req.body;
      const Email=email.toLowerCase();
      const duplicateShop = await Shops.findOne({ where: { shopName:shopName ,phoneNumber:phoneNumber,email:Email} });
    
      if(duplicateShop) {
        console.log("shop already registered");
        return res.status(409).json("shop already registered");
      }
      
      bcrypt.hash(password, 10).then((hash) => {
        Shops.create({
          shopName:shopName,
          phoneNumber:phoneNumber,
          email:Email,
          location:location,
          password:hash,
        });
        res.status(200).json("shop registred succesfully");
      });
    
  } catch (error) {
    next(error);
  }
  
});


//update
shopController.put("/shop/update/:id",validateToken, async (req, res,next) => {
  try {
    const id=req.params.id;
  const { shopName,phoneNumber,email,location,password} = req.body;

  

  const findId=await Shops.findByPk(id);
  if(!findId) {
    console.log("sorry id not found");
    return res.status(404).json('no shop with that id');
  }

  bcrypt.hash(password, 10).then((hash) => {
    Shops.update({
      shopName:shopName,
      phoneNumber:phoneNumber,
      email:email,
      location:location,
      password:hash},{
     where:{ id:id}
    });
    res.status(200).json("shop updated succesfully");
  });

  } catch (error) {
    next(error);
  }
  
});
//login shop
shopController.post("/shop/login", async (req, res,next) => {
  try {
    const {shopName,password } = req.body;
    console.log(req.body)
  const shop = await Shops.findOne({ where: { shopName:shopName} });
      console.log("found data is")
      console.log(shop)
  if (!shop) return res.status(403).json({ error: "shop Doesn't Exist" });

  bcrypt.compare(password, shop.password).then(async (match) => {
    if (!match) res.json({ error: " Shopname and password does not match" });

    const accessToken =sign(
      { shopName:shop.shopName,
         id: shop.id },
      "chatbotsecret"
      //to include expire time uncomment the following line and set time interval in this case its 24hours, 2s mean 2 seconds etc
      //,{expiresIn:'24h'}
    );
    res.status(200).json({message:"successfull", token: accessToken, shopName:shop.shopName,email:shop.email,location:shop.location,phoneNumber:shop.phoneNumber,id: shop.id});
  });
  } catch (error) {
    next(error);
  }
  
});


shopController.get("/shop/details/:id", validateToken,async (req, res,next) => {
  try {
    const id = req.params.id;

const basicInfo = await Shops.findByPk(id, {
  attributes: {exclude: ["password "]},});

  res.json(basicInfo);
  } catch (error) {
    next(error);
  }

});

shopController.get("/shop/All",async (req, res,next) => {
 try {


  const shops = await Shops.findAll({attributes: {exclude: ["password "]}});

  
  res.status(200).json(shops);
 } catch (error) {
   next(error);
 }
 
  
  });
  shopController.delete("/shop/delete/:id", async (req, res,next) => {
    try {
      const id = req.params.id;
    await Shops.destroy({
      where: {
        id:id,
      },
    });
    res.json("DELETED SUCCESSFULLY");
    } catch (error) {
      next(error);
    }
  
  });



  module.exports=shopController;
