
const express = require("express");
const router = express.Router();
const swaggerJSDoc=require("swagger-jsdoc");
const swaggerUI=require("swagger-ui-express");

const shopRouter=require("../controllers/shop/shopController");

//register shop
router.post("/shop/register",shopRouter);

//login 
router.post("/shop/login",shopRouter);

//infor abiout logged in shop
router.get("/shop/thisShop",shopRouter);

//find all shops
router.get("/shop/All",shopRouter);

//get a specific shop id
router.get("/shop/details/:id",shopRouter);
//update
router.put("/shop/update/:id",shopRouter);

//delete shop by id
router.delete("/shop/delete/:id",shopRouter);



module.exports = router;
