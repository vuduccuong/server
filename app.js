const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require('path');

const publicPath = path.join(__dirname, '..', 'public');

const PORT = process.env.PORT || 5000;
const {MONGOURI} = require('./keys');

//model
require('./model/user');
require('./model/post');


app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  };

app.use(express.static(publicPath));
//connect to db
mongoose.connect(MONGOURI,{
    
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//check connect ok
mongoose.connection.on('connected', ()=>{
    console.log("ok connect");
});
// connect err
mongoose.connection.on('error', (err)=>{
    console.log("connect fail", err);
});


//router
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
 });

 app.use(cors());
app.listen(PORT, () => {
    console.log('app running on ', PORT);
});

