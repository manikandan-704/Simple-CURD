const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Products = require("./Models/products.model.js");
const dotenv = require("dotenv");


dotenv.config();
const PORT = 3000;

//Middleware

app.use(express.json());

app.use(express.urlencoded({extended: false}));

//routes

app.use("/products",productRoute);

//Connect to DB

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected...`);
  } catch (error) {
    console.error(`Connection failed`, error);
    process.exit(1);
  }
};

// Running Server on Port 3000 after the Db connection

ConnectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});

// GET Method

app.get("/", (req, res) => {
  res.send("Hello from Node API server");
});

// Post - Create a product

app.post("/products/addproduct", async (req, res) => {
  try {
    const addproduct = await Products.create(req.body);
    res.status(200).json(addproduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get - a Single product

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Put - Update the product

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // const UpdatedProduct=await Products.findById(id);
    res.status(200).json(res.UpdatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete - Delete product

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const del = await Products.findByIdAndDelete(id, req.body);
    if (!del) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
