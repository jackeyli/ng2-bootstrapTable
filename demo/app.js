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
app.engine('.html', ejs.__express);
app.set('views',__dirname + '/app/views');
app.set('view engine', 'html');
app.use('/static',express.static(path.join(__dirname,'/app/static')));
app.get('/',function(req,res){
    res.render('index');
})
app.get('/remoteUrl',function(req,res){
        var obj = [];
        for(var i = 0; i < 100; i ++)
        {
            obj.push({
                "namex": "ng-bsTable",
                "column1": i,
                "column2": i + 12
            })
        }
        res.send(JSON.stringify(obj));
    }
)
app.listen(8188);