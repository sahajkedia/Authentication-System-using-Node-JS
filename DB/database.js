const mongoose = require('mongoose');
const DB = process.env.DATABASE
require('dotenv').config()
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=> {
    console.log("Database is connected");
})
.catch((err) =>{
    console.log(err);
})