const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Connect to DB

const ConnectDB=async ()=>{
try{
    await mongoose.connect(
        'mongodb+srv://nagarajpriyan2004_db_user:manikandan-704@curd.klwsqhp.mongodb.net/Node-API?appName=CURD')
    console.log("MongoDB Connected Successfully");
    
}
catch(error){
     console.error(`Connection failed`,error);
     process.exit(1);
}}


// Running Server on Port 3000 after the Db connection

ConnectDB().then(()=>{       
   app.listen(3000,()=>{
    console.log("Server is running");
});
})

// GET-Read 

app.get('/', (req,res)=>{
    res.send("Hello from Node API server");
});


