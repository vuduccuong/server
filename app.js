const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;
const {MONGOURI} = require('./keys');

//model
require('./model/user');
require('./model/post');

const corsOptions = {
    origin: 'https://intagram-cl0ne.herokuapp.com/',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT,POST, PATCH"
}

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

app.use(cors());
//router
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));

app.listen(PORT, () => {
    console.log('app running on ', PORT);
});

