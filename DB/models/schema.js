const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const userSchema = new Schema({
    name : {
        required : true,
        type : String
    },
    password : {
        required:true,
        type : String
    },
    cpassword : {
        type : String,
        required : true
    },
    email: {
        required : true,
        type : String
    },
    number : {
        type : Number,
        required : true
    },
    tokens : [
        {
            token: {
                type : String,
                required : true
            }
        }
    ]
});

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.cpassword,12);
    }
})

userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token:token }); 
        await this.save();
        return token;

    }
    catch(err){
        console.log(err);
    }
}
const User = mongoose.model('User', userSchema);
module.exports = User;