const express = require('express');
const app = express();
require('dotenv').config()
app.use(express.json());  
require('./DB/database');
app.use(require('./routes/router'));  

// const DB = "mongodb+srv://sahaj:don@cluster0.vvk6y.mongodb.net/mydatabase?retryWrites=true&w=majority"
//  const DB = "mongodb+srv://user1234:password123@cluster0.vvk6y.mongodb.net/mydatabase?retryWrites=true&w=majority"
// const DB = "mongodb://sahaj:don@cluster0-shard-00-00.vvk6y.mongodb.net:27017,cluster0-shard-00-01.vvk6y.mongodb.net:27017,cluster0-shard-00-02.vvk6y.mongodb.net:27017/mydatabase?ssl=true&replicaSet=atlas-g5vq74-shard-0&authSource=admin&retryWrites=true&w=majority"
const port =process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`running server`);
})