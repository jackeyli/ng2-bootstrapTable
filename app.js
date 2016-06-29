/**
 * Created by LIJA3 on 5/17/2016.
 */
var express = require('express');
var ejs = require('ejs'),
    path=require('path');
var app = express();
var http = require('http');
var app = express(),
    fs= require('fs')
var loginService = require('./loginService');
app.engine('.html', ejs.__express);
app.set('views',__dirname + '/app/views');
app.set('view engine', 'html');
app.use('/static',express.static(path.join(__dirname,'/app/static')));
app.get('/',function(req,res){
    res.render('index');
})
app.listen(8188);