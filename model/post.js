const mongoose = require('mongoose');
const {ObjectID} = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    body:{
        type: String,
        required:true
    },
    photos:{
        type: String,
        default: 'no photo'
    },
    postedBy:{
        type: ObjectID,
        ref: "User"
    }
});

mongoose.model("Post", postSchema)