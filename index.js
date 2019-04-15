
// import { print } from 'util';

const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
var xlsx = require('node-xlsx');
var formidable = require('formidable');
var fs = require('fs');

const cors = require('cors')

const PORT = 3000
// const blast = require('./routes/blast')
const app = express()
app.set('view engine', 'ejs');

app.use(cors())
app.use(bodyParser.json())
app.use(fileUpload());
// app.use('/blast',blast)

var blast = require('./routes/blast.js');

app.use('/blast', blast);

app.get('/',function(req,res){
    res.render('dashboard', {result:[{}]})
})



app.listen(PORT, function(res){
    console.log('Server running on localhost:' + PORT)
    
})