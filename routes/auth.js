const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

//middleware
const requireLogin = require('../middleware/requireLogin');
//mongo
const mongoose = require('mongoose');
const User = mongoose.model('User');


const utils = require('../utils/validate');
const {JWT_KEY} = require('../keys');

router.get('/', (req, res)=>{
    res.send("Hooo lee");
});

//Register
router.post('/signup', (req,res)=>{
    const {name, email, password} = req.body;
     if(!utils.vaild(name, email, password)){
        return res.status(422).json({error:"No no no"});
     };
     // check exits email
     User.findOne({email:email})
     .then(user=>{
        //exits 
        if(user){
           return res.status(422).json({err:"user had exits"});
        };

        //hash password
        bcryptjs.hash(password, 12)
        .then(passhash=>{
            const users = new User({
                name: name,
                email: email,
                password: passhash
            });
    
            users.save()
            .then(user =>{
                res.status(200).json({
                    message:"Ok register!",
                    pass: bcryptjs.compareSync(password, passhash)
                });
            })
            .catch(err => console.log("save user err", err));
        })
        .catch(err=>console.log("hash password false"));
     })
     .catch(err => console.log("find err", err));
});

//signin
router.post('/signin',(req, res)=>{
    //get email, password
    console.log(req.body);
    const {email, password} = req.body;

    User.findOne({email:email})
    .then(user=>{
        if(!user){
            return res.status(422).json({message:"User not register"});
        }
        bcryptjs.compare(password, user.password)
        .then(doMath=>{
            if(!doMath) return res.status(422).json({message:'Invalid Email or Password'});
            //return res.json({message:'OK'});
            user.password = undefined;
            const token = jwt.sign({_id:user._id},JWT_KEY);
            res.json({token:token,user:user});
        })
        .catch(err=>console.log("err compare password and hash", err));
    })
    .catch(err=>{
        console.log("can't find user by email",err);
    })
});


module.exports = router;