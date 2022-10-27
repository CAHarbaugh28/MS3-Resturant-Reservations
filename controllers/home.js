const router = require('express').Router()
var app = express()
var mysql = require('mysql');
import '/controllers/home.html'

app.get('/',function(req,res) {
    res.sendFile('./views/index.html');
  });  

const element = document.getElementById("demo");

module.exports = router
