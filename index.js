const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Products = require("./Models/products.model.js");



app.use(express.json());

//Connect to DB

const ConnectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://nagarajpriyan2004_db_user:manikandan-704@curd.klwsqhp.mongodb.net/Node-API?appName=CURD",
    );
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error(`Connection failed`, error);
    process.exit(1);
  }
};

// Running Server on Port 3000 after the Db connection

ConnectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server is running");
  });
}
);

// GET-Read

app.get("/", (req, res) => {
  res.send("Hello from Node API server");
});

//Post - Create

app.post("/product",async (req,res)=>{
    try {
      const product=await Products.create(req.body); 
      res.status(200).json(product);
    } 
    catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.get("/products",async (req,res)=>{
    try {
      const products=await Products.find({}); 
      res.status(200).json(products);
    } 
    catch (error) {
        res.status(500).json({message: error.message})
    }
});
