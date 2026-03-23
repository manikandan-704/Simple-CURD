const express = require("express");
const Product = require("../Models/products.model.js");
const router = express.Router();
const {getProducts}= require ("../Controller/product.controller.js")

// Get - all products

router.get("/",getProducts);

module.exports=router;
