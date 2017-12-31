const express = require('express');
const app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var client = mongodb.MongoClient;
var convert = require('./convert.js');

const mongoUrl = "mongodb://user:urlData@ds131237.mlab.com:31237/url_shortener";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.listen(8080,function(){
  console.log("Listening to 8080");
});

app.get('/',function(req,res){
  res.sendFile(index.html);
});

app.post('/api/shorten',function(req,res){
  var longUrl = req.body.url;
  var shortUrl = '';
  client.connect(mongoUrl,function(err,database){
    if(err){
      return console.log(err);
    }
    var db = database.db('url_shortener');
    db.collection('shortenedUrl').findOne({long_url: longUrl},function(err,doc){
      if(doc){
        shortUrl = "http://localhost:8080/" + convert.encode(String(doc._id));
        res.send({'shortUrl' : shortUrl});
      }
      else{
        var obj = [{
          long_url : longUrl
        }];
        db.collection('shortenedUrl').insertMany(obj,function(err,result){
          if(err){
            return console.log(err);
          }
          var shortId = convert.encode(String(result.ops[0]._id));
          shortUrl = "http://localhost:8080/" + shortId;
          var idObj = [{
            short_id : shortId,
            actual_id : String(result.ops[0]._id)
          }];
          db.collection('shortenedId').insertMany(idObj,function(err,result){
            if(err){
              return console.log(err);
            }
          });
          res.send({'shortUrl': shortUrl});
        });
      }
    });
  });
  });

app.get('/:encoded',function(req,res){
  var encoded = req.params.encoded;
  var id = convert.decode(encoded);
  client.connect(mongoUrl,function(err,database){
    if(err){
      return console.log(err);
    }
    var db = database.db('url_shortener');
    db.collection('shortenedId').findOne({short_id: encoded},function(err,doc){
      if(err){
        console.log(err);
      }
      if(doc){
        db.collection('shortenedUrl').find({}).toArray(function(err,result){
          if(err){
            return console.log(err);
          }
          var flag = 0;
          for(var i = 0;i <= result.length - 1;i++){
            if(result[i]._id == doc.actual_id){
              res.redirect(result[i].long_url);
              flag = 1;
            }
          }
          if(flag == 0){
          res.redirect("http://localhost:8080/");
        }
        });
      }
      else{
        console.log(2);
        res.redirect("http://localhost:8080/");
      }
    });
  });
});
