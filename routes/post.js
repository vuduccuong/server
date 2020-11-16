const express = require('express');
const router = express.Router();
//middleware
const requireLogin = require('../middleware/requireLogin');
//mongo
const mongoose = require('mongoose');
const Post = mongoose.model('Post');

//utils

const utils = require('../utils/validate');

router.post('/creatpost',requireLogin,(req,res) => {
    const {title, body} = req.body;
    if(!utils.validPost(title, body)){
        return res.status(422).json({err:`Title, Body can't not null`});
    }

    req.user.password = undefined;
    const post = new Post({
        title: title,
        body: body,
        postedBy: req.user
    });

    post.save()
    .then(result=>{
        res.json({message:result});
    })
    .catch(err=>{
        console.log("Err save post", err);
    });
});

router.get('/posts', (req, res) =>{
    const {keyword} = req.body;
    if(!keyword){
        Post.find()
        //Get user info post
        .populate("postedBy","_id name")
        .then(result=>{
            return res.json({
                post: result
            })
        }).
        catch(err=>{
            console.log("Err get post",err);
        });
    }else{
    Post.find({title: keyword})
    .populate("postedBy","_id name")
    .then(result => {
        return res.json({
            post: result
        })
    })
    .catch(err => console.log("Find by keyword Err", err));
}
});

//get my post
router.get('/mypost',requireLogin,(req, res)=>{
    const {_id} = req.user;
    Post.find({postedBy:_id})
    .populate("postedBy","_id name")
    .then(result =>{
        return res.json({post:result});
    })
    .catch(err => console.log("Find my post err", err));
});

module.exports = router;