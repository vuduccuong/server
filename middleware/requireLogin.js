const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

//json key
const {JWT_KEY} = require('../keys');

module.exports = (req, res, next) => {
    //get data from headers
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({err:'you must login'});
    }

    const token = authorization.replace("Bearer ", '');
    jwt.verify(token,JWT_KEY,(err, payload)=>{
        if(err){
            return res.status(401).json({err:'you must login'});
        }

        const {_id} = payload
        const user = User.findById(_id)
        .then(res=>{
            req.user = res;
            next();
        });
    });
};