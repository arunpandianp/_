var bodyParser = require('body-parser')
var express = require('express');
var app = express();
var util = require('util')
var redis = require('node-redis');
var client = redis.createClient(6379, "198.206.15.145")
client.get('s', function (error, buffer) { console.log(buffer);console.log(error);})

app.use( bodyParser.json() );

app.get('/hello',function (req,res) {
        client.hgetall("chrome",function(err, resl){
         for (i in resl) {
          //  console.log(resl[i].toString());
//            items.push(JSON.parse(resl[i]));i
                res.write(resl[i].toString()+"\n");
         }
res.end();
     });
//client.hgetall("chrome",function(err, result){ console.log(result);res.end(util.inspect(result));});
});

app.post('/hello', function(req,res) {
        var data = req.body;
        for(var key in data) {
                if(key != "[object Object]") {
                client.hincrby("chrome",key,data[key],function(){console.log("OK");})
                console.log("sa");
                }
        }
        console.log(util.inspect(req.body));
        res.end();
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

var server = app.listen(3004, function() {
    console.log('Listening on port %d', server.address().port);
});