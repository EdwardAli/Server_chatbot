const express = require("express");
const ProductController = express.Router();
const nodeCron=require('node-cron');
const {Shops,Product:Products} = require("../../models");
const { validateToken } = require("../../../middlewares/AuthMiddleware");


ProductController.get("/product/All", async (req, res,next) => {
try {
  
const products = await Products.findAll();
  res.status(200).json(products);

} catch (error) {
  next(error);
}

});

 ProductController.get("/product/byShop/:ShopId", async (req, res,next) => {
try {
 
  const id = req.params.ShopId;
  const productBySupplier = await Products.findAll({ where: {ShopId: id}});
  res.status(200).json(productBySupplier);
} catch (error) {
  next(error);
}
 });


 ProductController.get("/product/byId/:productiId", async (req, res,next) => {
   try {
    const id = req.params.productId;
    const product=await Products.findOne({where:{id:id}});
    if(product){
     res.status(200).json(product);
    }else{
      res.status(404).json("Not found");
    }
   } catch (error) {
     next(error);
   }
  
  });


ProductController.post("/product/create/:shopId",validateToken, async (req, res,next) => {

  //variables
 
  try {
   
    const {Name,Quantity,Description,Price}=req.body;
    const id=req.params.shopId;
    
    const name=Name.toLowerCase();
    const duplicateProduct=await Products.findOne({where:{Name:name,Quantity:Quantity,ShopId:id}});
    if(duplicateProduct){return res.status(409).json("already registered")};
    try {
      const shop=await Shops.findByPk(id);
      if(shop){
        const product=req.body;
        product.Name=name;
        product.Shop=shop.shopName;
        product.ShopId=id;
       await Products.create(product)
            res.status(200).json(product);
            console.log("successful");
      }else{
        res.status(404).json("Shop not found");
      }
       
    } catch (error) {
        
    }
  
  } catch (error) {
      next(error);
  }
  
  
});


 ProductController.delete("/product/delete/:productId", async (req, res,next) => {
   try {
    const productId = req.params.productId;
    await Products.destroy({
      where: {
        id:productId,
      },
    });
    res.status(200).json("DELETED SUCCESSFULLY");
   } catch (error) {
     next(error);
   }
 
});

ProductController.put("/product/update/:productId", async (req, res,next) => {
 
try {
  const id = req.params.productId;
  const available=await Products.findOne({where:{id:id}})
  if(available){
    await Products.update(req.body,{
        where: {
          id:id,
        },
      });
      res.status(200).json("updated succesfully");
  }else{
    return res.status(400).json("NO such product available");
  }
  
} catch (error) {
next(error);
}

});



module.exports = ProductController;