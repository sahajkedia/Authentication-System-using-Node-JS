const express = require('express');
const bcrypt = require('bcryptjs')
const router = express.Router();
const User = require('../DB/models/schema');
const jwt = require('jsonwebtoken');
const middleware = (req,res,next) =>{  
    next();  
}
router.get('/', (req,res)=>{
    res.send("Hello I am Here");
})
router.get('/about',middleware, (req,res)=>{
    res.send("Welcome to the about page");
})



// router.post('/reg',(req,res) => {
    
//     const { name,password,cpassword,email,number } = req.body;
    
//     if( !name || !password || !cpassword || !email || !number  )
//         return res.status(422).json({
//             "error" : "Something is missing"
//         })

//     const user = new User({ name, password, cpassword, email, number })
//             user.save().then(() => {
//                 res.status(201).json({
//                     message : "user registeration successful"
//                 })
//             })
//             .catch((err) => {
//                 console.log(err);
//                 res.status(500).json({error : "Registeration Failed"})});
//      })

     router.post('/reg',async(req,res) => {
    
        const { name,password,cpassword,email,number } = req.body;
        
        if( !name || !password || !cpassword || !email || !number  )
            return res.status(422).json({
                "error" : "Something is missing"
            })
        
        try{
            const userExist = await User.findOne({email:email});
            if(userExist){
                return res.status(422).json({
                    error: "Email already exists"
                });
            }
            else if(password != cpassword){
                return res.status(422).json({
                    error: "Passwords aren't matching"
                });
            }
            else{
            const user = new User({ name, password, cpassword, email, number })
                await user.save();
                res.status(201).json({
                    message : "user registeration successful"
                })}}
                
                catch(err) {
                    console.log(err);
                }
         })

         router.post("/login",async(req,res)=>{
             let token;
            const { password,email } = req.body;

            
           try {
            if(!email,!password){
                return res.status(400).json({
                    message: "Empty Credentials :("
                })
            }

        
               const userExist = await User.findOne({
                email:email
            })
            
            if(userExist){
                const PasswordChecker = await bcrypt.compare(password,userExist.password);
                token = await userExist.generateAuthToken();
                console.log(token);
                res.cookie("jwt",token, {
                    expires : new Date(Date.now() + 25892000000),
                    httpOnly:true
                })
                
                if(PasswordChecker)
                    res.status(201).json({
                        message: "Logged In Successfully :)"
                })
                else
                    res.status(400).json({
                        message:"Wrong Credentials Found :("
            })

            }
            else{
                res.status(400).json({
                    message: "Wrong Credentials Found :("
            
         })}
         }catch(err){
             console.log(err);
         }
        })
         

module.exports = router;