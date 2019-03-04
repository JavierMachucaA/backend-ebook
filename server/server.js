require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const Receta = require('../server/models/receta');

const mongoose = require('mongoose')
const path = require('path')

mongoose.set('useCreateIndex', true); 
mongoose.set('useFindAndModify', false);


// Initial Config
const app = express();
const port = process.env.PORT || 4000;
app.use( express.static(path.resolve(__dirname,'../public')))

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./routes/index.route'));
mongoose.connect(process.env.URLDB,{ useNewUrlParser: true },
    (err,res)=>{
        console.log("Base de datos Conectada ...")
    }
)

// Server
app.listen(port, () => console.log(`Listening on port ${port}`));
