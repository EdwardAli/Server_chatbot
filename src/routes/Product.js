const express = require("express");
const ProductRouter = require("../controllers/Product/productController");
const Product = express.Router();

 
const ProductController=require("../controllers/Product/productController");
//register at /product/create
Product.post("/product/create/:shopId",ProductController);
//all of specific shop
Product.get("/product/byShop/:ShopId",ProductRouter);
//find all products
Product.get("/product/All",ProductController);

//get a specific product by id
Product.get("/product/byId/:productId",ProductController);
//update product
Product.put("/product/update/:productId",ProductController);

//delete  by id at 3001/shop/delete/:id
Product.delete("/product/delete/:productId",ProductController);
    
module.exports = Product;
